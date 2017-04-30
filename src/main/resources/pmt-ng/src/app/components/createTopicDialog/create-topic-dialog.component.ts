import { Component } from '@angular/core';
import { Topic } from "../../model/topic"
import { Regulation } from "../../model/regulation"
import { RequirementService } from "../../services/requirement.service"

import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'create-topic-dialog',
  templateUrl: './create-topic-dialog.component.html',
  styleUrls: ['./create-topic-dialog.component.css']
})
export class CreateTopicDialogComponent {
  display: boolean = false;
  topic: Topic = new Topic(null, null, null, null);
  regulations: SelectItem[] = [];

  constructor(private requirementService: RequirementService) {}

  clear() {
    this.topic = new Topic(null, null, null, null);
    this.regulations = [];
  }

  showDialog() {
    let regulations: Regulation[] = this.requirementService.getAllRegulations();
    if(regulations.length > 0){
      this.topic.regulationId = regulations[0].id;
      this.display = true;
      regulations.forEach(regulation => {
        this.regulations.push({label: regulation.name, value:regulation.id});
      });
    }
  }

  create() {
    let index = this.requirementService.addRequirement(this.topic);
    this.display = false;
    this.clear();
  }

  cancel() {
    this.display = false;
    this.clear();
  }
}
