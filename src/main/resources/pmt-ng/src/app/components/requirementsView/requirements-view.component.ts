import { Component } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { RequirementService } from "../../services/requirement.service"
import { RequirementNode } from "../../model/requirement-node"


@Component({
  selector: 'requirements-view',
  templateUrl: './requirements-view.component.html',
  styleUrls: ['./requirements-view.component.css']
})
export class RequirementsViewComponent {
  requirements: TreeNode[];

  constructor(private requirementService: RequirementService) {}

  editRegulation(node: RequirementNode) {
    alert("regulation");
  }

  editTopic(node: RequirementNode) {
    alert("topic");
  }

  ngOnInit() {
        this.requirementService.requirementTree.subscribe(
          requirements => {
            this.requirements = requirements;
          }
        )
      }

}
