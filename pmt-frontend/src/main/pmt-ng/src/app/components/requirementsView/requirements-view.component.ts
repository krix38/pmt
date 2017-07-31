import { Component, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { RequirementService } from "../../services/requirement.service"
import { RequirementNode } from "../../model/requirement-node"
import { EditTopicDialogComponent }
    from '../editTopicDialog/edit-topic-dialog.component'
import { EditRegulationDialogComponent }
    from '../editRegulationDialog/edit-regulation-dialog.component'

@Component({
  selector: 'requirements-view',
  templateUrl: './requirements-view.component.html',
  styleUrls: ['./requirements-view.component.css']
})
export class RequirementsViewComponent {
  requirements: TreeNode[];

  constructor(private requirementService: RequirementService) {}

  @ViewChild(EditTopicDialogComponent) editTopicDialog;
  @ViewChild(EditRegulationDialogComponent) editRegulationDialog;


  editRegulation(regulation: RequirementNode) {
    this.editRegulationDialog.showDialog(regulation.id);
  }

  editTopic(topic: RequirementNode) {
    this.editTopicDialog.showDialog(topic.id);
  }

  ngOnInit() {
        this.requirementService.requirementTree.subscribe(
          requirements => {
            this.requirements = requirements;
          }
        )
      }

}
