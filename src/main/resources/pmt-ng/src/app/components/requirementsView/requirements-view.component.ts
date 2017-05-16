import { Component, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { RequirementService } from "../../services/requirement.service"
import { RequirementNode } from "../../model/requirement-node"
import { EditTopicDialogComponent }
    from '../editTopicDialog/edit-topic-dialog.component'

@Component({
  selector: 'requirements-view',
  templateUrl: './requirements-view.component.html',
  styleUrls: ['./requirements-view.component.css']
})
export class RequirementsViewComponent {
  requirements: TreeNode[];

  constructor(private requirementService: RequirementService) {}

  @ViewChild(EditTopicDialogComponent) editDialog;

  editRegulation(node: RequirementNode) {
    alert("regulation");
  }

  editTopic(topic: RequirementNode) {
    this.editDialog.showDialog(topic.id);
  }

  ngOnInit() {
        this.requirementService.requirementTree.subscribe(
          requirements => {
            this.requirements = requirements;
          }
        )
      }

}
