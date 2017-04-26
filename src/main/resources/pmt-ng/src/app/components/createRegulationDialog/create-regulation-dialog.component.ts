import { Component } from '@angular/core';
import { Regulation } from "../../model/regulation"
import { RequirementService } from "../../services/requirement.service"

@Component({
  selector: 'create-regulation-dialog',
  templateUrl: './create-regulation-dialog.component.html',
  styleUrls: ['./create-regulation-dialog.component.css']
})
export class CreateRegulationDialogComponent {
  display: boolean = false;
  regulation: Regulation = new Regulation(null, null, null);

  constructor(private requirementService: RequirementService) {}

  clear() {
    this.regulation = new Regulation(null, null, null);
  }

  showDialog() {
    this.display = true;
  }

  create() {
    let index = this.requirementService.addRequirement(this.regulation);
    this.display = false;
    this.clear();
  }

  cancel() {
    this.display = false;
    this.clear();
  }
}
