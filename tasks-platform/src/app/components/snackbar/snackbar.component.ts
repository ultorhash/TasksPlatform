import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { interval, takeWhile, tap } from 'rxjs';
import { AlertTypes } from '@enums';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  private readonly step: number = 0.005;

  public progress: number = 100;
  public alertTypes: typeof AlertTypes = AlertTypes;

  constructor(
    private snackbarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.snackbarRef
      .afterOpened()
      .pipe(
        tap(() => {
          const duration = this.snackbarRef.instance.data.duration;
          this.runProgressBar(duration);
        })
      )
      .subscribe();
  }

  onDismiss(): void {
    this.snackbarRef.dismissWithAction();
  }

  private runProgressBar(duration: number): void {
    interval(duration * this.step).pipe(
      takeWhile(() => this.progress >= 0),
      tap(() => this.progress -= 100 * this.step)
    )
    .subscribe();
  }
}
