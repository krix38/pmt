import { Component } from '@angular/core';
import { Topic } from "../../model/topic"
import { RequirementService } from "../../services/requirement.service"

@Component({
  selector: 'create-topic-dialog',
  templateUrl: './create-topic-dialog.component.html',
  styleUrls: ['./create-topic-dialog.component.css']
})
export class CreateTopicDialogComponent {
  display: boolean = false;
  topic: Topic = new Topic(null, null, null, null);

  constructor(private requirementService: RequirementService) {}

  clear() {
    this.topic = new Topic(null, null, null, null);
  }

  showDialog() {
    this.display = true;
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
