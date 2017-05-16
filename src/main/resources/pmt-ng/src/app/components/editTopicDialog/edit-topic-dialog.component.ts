import { Component } from '@angular/core';
import { Topic } from "../../model/topic"
import { Regulation } from "../../model/regulation"
import { RequirementService } from "../../services/requirement.service"

import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'edit-topic-dialog',
  templateUrl: './edit-topic-dialog.component.html',
  styleUrls: ['./edit-topic-dialog.component.css']
})
export class EditTopicDialogComponent {
  display: boolean = false;
  topic: Topic = new Topic(null, null, null, null);
  regulations: SelectItem[] = [];

  constructor(private requirementService: RequirementService) {}

  clear() {
    this.topic = new Topic(null, null, null, null);
    this.regulations = [];
  }

  showDialog(topicId: number) {
    this.requirementService.getTopic(topicId, topic => {
      if(topic != null){
        this.topic = topic;
        this.requirementService.getAllRegulations(regulations => {
          if(regulations.length > 0){
            this.display = true;
            regulations.forEach(regulation => {
              this.regulations.push({label: regulation.name, value:regulation.id});
            });
          }
        });
      }
    });
  }

  update() {
    let index = this.requirementService.updateRequirement(this.topic);
    this.display = false;
    this.clear();
  }

  cancel() {
    this.display = false;
    this.clear();
  }
}
