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
            $doctors = Doctor::whereHas('users_and_doctors', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })->get();

            $visits = Visiting::whereYear('visit_date', $year)
                ->whereMonth('visit_date', $month)
                ->where('user_id', $user->id)
                ->get();

            $data = [
                'doctors' => $doctors,
                'visits' => $visits,
            ];

            return new ShowVisitByMonthForOneUserResource($data);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    // public function showVisitByDateForOneUser($date, $userId)
    // {
    //     try {
    //         $user = User::findOrFail($userId);
    //         $doctors = Doctor::whereHas('users_and_doctors', function ($query) use ($userId) {
    //             $query->where('user_id', $userId);
    //         })->get();
    //         $visits = Visiting::whereDate('visit_date', $date)
    //             ->where('user_id', $user->id)
    //             ->get()
    //             ->keyBy('doctor_id');
    //         return response()->json(['doctor_id' => $doctors, 'visited' => $visits]);
    //     } catch (Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }



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
