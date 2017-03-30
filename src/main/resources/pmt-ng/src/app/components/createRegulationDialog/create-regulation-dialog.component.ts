import { Component } from '@angular/core';

@Component({
  selector: 'create-regulation-dialog',
  templateUrl: './create-regulation-dialog.component.html',
  styleUrls: ['./create-regulation-dialog.component.css']
})
export class CreateRegulationDialogComponent {
  display: boolean = false;

  showDialog() {
    this.display = true;
  }
}
