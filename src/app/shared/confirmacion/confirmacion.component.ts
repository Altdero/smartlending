import { Component, Inject } from '@angular/core';

import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styles: []
})
export class ConfirmacionComponent {

  constructor(
    private matSnackBarRef: MatSnackBarRef<any>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  cierraSnackBar(guardar: boolean) {
    if (guardar) {
      this.matSnackBarRef.dismissWithAction();
    } else {
      this.matSnackBarRef.dismiss();
    }
  }

}
