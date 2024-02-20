import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { SignService } from '../pages/sign/services/sign/sign.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: SignService,
    private alertCtrl: AlertController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authService.getToken()).pipe(
      mergeMap((token) => {
        const clonedReq = this.addToken(request, token);
        return next.handle(clonedReq).pipe(
          catchError((error) => {
            let msg = error.message || 'Unknown error';

            this.presentAlert(error.name, msg);

            return throwError(error);
          })
        );
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: any): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return request;
  }

  private async presentAlert(title: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
