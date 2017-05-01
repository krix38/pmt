import { Component } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { RequirementService } from "../../services/requirement.service"
import { RequirementNode } from "../../model/requirement-node"
import { RequirementNodeType } from "../../model/requirement-node-type"



@Component({
  selector: 'requirements-view',
  templateUrl: './requirements-view.component.html',
  styleUrls: ['./requirements-view.component.css']
})
export class RequirementsViewComponent {
  requirements: TreeNode[];

  constructor(private requirementService: RequirementService) {}

  editNode(node: RequirementNode) {
    alert(node.requirementType);
  }

  ngOnInit() {
        this.requirementService.requirementTree.subscribe(
          requirements => {
            this.requirements = requirements;
          }
        )
      }

}
