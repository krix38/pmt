import { Component } from '@angular/core';
import { Regulation } from "../../model/regulation"
import { RegulationService } from "../../services/regulation.service"

@Component({
  selector: 'create-regulation-dialog',
  templateUrl: './create-regulation-dialog.component.html',
  styleUrls: ['./create-regulation-dialog.component.css']
})
export class CreateRegulationDialogComponent {
  display: boolean = false;
  regulation: Regulation = new Regulation();

  constructor(private regulationService: RegulationService) {}

  clear() {
    this.regulation = new Regulation();
  }

  showDialog() {
    this.display = true;
  }

  create() {
    let index = this.regulationService.addRegulation(this.regulation);
    alert(index);
    this.display = false;
    this.clear();
  }

  cancel() {
    this.display = false;
    this.clear();
  }
}
