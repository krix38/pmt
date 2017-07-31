import { Component } from '@angular/core';
import { Regulation } from "../../model/regulation"
import { RequirementService } from "../../services/requirement.service"

import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'edit-regulation-dialog',
  templateUrl: './edit-regulation-dialog.component.html',
  styleUrls: ['./edit-regulation-dialog.component.css']
})
export class EditRegulationDialogComponent {
  display: boolean = false;
  regulation: Regulation = new Regulation(null, null, null);

  constructor(private requirementService: RequirementService) {}

  delete() {
    let index = this.requirementService.deleteRequirement(this.regulation);
    this.display = false;
    this.clear();
  }

  clear() {
    this.regulation = new Regulation(null, null, null);
  }

  showDialog(regulationId: number) {
    this.requirementService.getRegulation(regulationId, regulation => {
      if(regulation != null){
        this.regulation = regulation;
        this.display = true;
      }
    });
  }

  update() {
    let index = this.requirementService.updateRequirement(this.regulation);
    this.display = false;
    this.clear();
  }

  cancel() {
    this.display = false;
    this.clear();
  }
}
