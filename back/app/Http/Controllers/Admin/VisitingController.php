<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminVisitingResource;
use App\Http\Resources\showVisitByMonthForOneUserResource;
use App\Http\Resources\VisitingResource;
use App\Models\Doctor;
use App\Models\User;
use App\Models\users_and_doctors;
use App\Models\Visiting;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VisitingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    public function showVisitForEveryUser($userId)
    {
        try {
            $user = User::findOrFail($userId);
            $visits = Visiting::where('user_id', $user->id)->get();
            return VisitingResource::collection($visits);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
    public function showVisitByDate($date)
    {
        try {
            $visits = Visiting::whereDate('visit_date', $date)->get();
            return VisitingResource::collection($visits);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }




    public function showVisitByMonthForOneUser($year, $month, $userId)
    {
        try {
            if (!checkdate($month, 1, $year)) {
                return response()->json(['error' => 'Invalid month or year.'], 400);
            }

            $user = User::findOrFail($userId);

            $doctors = $user->doctors()->with([
                'visiting' => function ($query) use ($year, $month) {
                    $query->whereYear('visit_date', $year)
                        ->whereMonth('visit_date', $month);
                }
            ])->with('visitRates')->get();

            $result = $doctors->map(function ($doctor) {
                return [
                    'id' => $doctor->id,
                    'name_en' => $doctor->name_en,
                    'name_ar' => $doctor->name_ar,
                    'created_at' => $doctor->created_at->format('Y-m-d'),
                    'class' => $doctor->class,
                    'visiting' => $doctor->visiting,
                    'visitRates' => $doctor->visitRates
                ];
            });

            return response()->json($result);

        } catch (Exception $e) {

            return response()->json(['error' => 'An error occurred while fetching data.'], 500);
        }
    }

    public function getVisitsAndDaysOff($year, $month, $userId)
    {
        try {
            Log::info("Year: $year, Month: $month, User ID: $userId");

            if (!is_numeric($year) || !is_numeric($month) || $year < 1000 || $year > 9999 || $month < 1 || $month > 12) {
                Log::error("Validation failed for Year: $year, Month: $month");
                return response()->json(['error' => 'Invalid month or year.'], 400);
            }

            if (!checkdate($month, 1, $year)) {
                Log::error("Checkdate failed for Year: $year, Month: $month");
                return response()->json(['error' => 'Invalid month or year.'], 400);
            }

            $user = User::findOrFail($userId);

            // Fetch visits for the given month and year
            $visits = Visiting::whereYear('visit_date', $year)
                ->whereMonth('visit_date', $month)
                ->where('user_id', $userId)
                ->get()
                ->groupBy(function ($date) {
                    return \Carbon\Carbon::parse($date->visit_date)->format('Y-m-d');
                });

            // Prepare the list of all days in the given month
            $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);
            $allDays = [];
            for ($day = 1; $day <= $daysInMonth; $day++) {
                $allDays[] = sprintf('%04d-%02d-%02d', $year, $month, $day);
            }

            // Prepare visitedDays with the count of visits
            $visitedDays = [];
            foreach ($visits as $date => $visitGroup) {
                $visitedDays[] = [
                    'date' => $date,
                    'count' => $visitGroup->count(),
                ];
            }

            // Calculate days off
            $visitedDates = array_column($visitedDays, 'date');
            $daysOff = array_diff($allDays, $visitedDates);

            return response()->json([
                'visited_days' => $visitedDays,
                'days_off' => array_values($daysOff),
            ], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching data.'], 500);
        }
    }





    public function calculateTotalDoctorsForMonthOneUser($year, $month, $id)
    {
        try {
            if (!checkdate($month, 1, $year)) {
                return response()->json(['error' => 'Invalid month or year.'], 400);
            }

            $user = User::findOrFail($id);

            $totalVisited = Visiting::whereYear('visit_date', $year)
                ->whereMonth('visit_date', $month)
                ->where('user_id', $user->id)
                ->distinct()
                ->count();

            $distinctDates = Visiting::whereYear('visit_date', $year)
                ->whereMonth('visit_date', $month)
                ->where('user_id', $user->id)
                ->distinct('visit_date')
                ->count();
            $averageVisits = ($distinctDates > 0) ? $totalVisited / $distinctDates : 0;

            $totalDoctors = Visiting::whereYear('visit_date', $year)
                ->whereMonth('visit_date', $month)
                ->where('user_id', $user->id)
                ->distinct('doctor_id')
                ->count();

            return response()->json([
                'total_visited_this_month' => $totalVisited,
                'average_visits_per_date' => $averageVisits,
                'total_doctors_visited_this_month' => $totalDoctors
            ], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    public function showVisitByDateForOneUser($date, $userId)
    {
        try {
            $user = User::findOrFail($userId);
            $visits = Visiting::whereDate('visit_date', $date)
                ->where('user_id', $user->id)
                ->get();
            return AdminVisitingResource::collection($visits);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }






    public function destroy(string $id)
    {
        try {
            $doctor = Visiting::findOrFail($id);
            $doctor->delete();

            return response()->json(['message' => 'deleted'], 200);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
}
