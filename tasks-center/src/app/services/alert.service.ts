import {
  Injectable,
  NgZone,
  OnDestroy
} from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarDismiss,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  filter,
  tap
} from "rxjs";
import { IAlert } from "../interfaces";
import { SnackbarComponent } from "../components";

@Injectable({
  providedIn: 'root'
})
export class AlertService implements OnDestroy {
  private readonly ALERT_TIME_MS: number = 4000;

  private alertSteam: BehaviorSubject<IAlert> = new BehaviorSubject<IAlert>({} as IAlert);
  private alertStream$ = this.alertSteam.asObservable();
  
  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {
    this.queueAlerts$().subscribe();
  }

  queueAlerts$(): Observable<MatSnackBarDismiss> {
    return this.alertStream$.pipe(
      filter((alert: IAlert) => !!alert.message),
      concatMap((alert: IAlert) => {
        return this.openSnackBar(alert).afterDismissed();
      })
    );
  }

  openSnackBar(alert: IAlert): MatSnackBarRef<SnackbarComponent> {
    return this.zone.run(() => {
      const { type, message, duration } = alert;

      const snackBarRef = this.snackBar.openFromComponent<SnackbarComponent, IAlert>(
        SnackbarComponent, {
          duration: duration ?? this.ALERT_TIME_MS,
          horizontalPosition: 'right',
          data: {
            type: type,
            message: message,
            duration: duration ?? this.ALERT_TIME_MS
          }
        }
      );

      snackBarRef.onAction().pipe(
        tap(() => snackBarRef.dismiss())
      ).subscribe();

      return snackBarRef;
    });
  }

  addAlert(alert: IAlert): void {
    this.alertSteam.next(alert);
  }

  ngOnDestroy(): void {
    this.alertSteam.next({} as IAlert);
    this.alertSteam.complete();
  }
}
