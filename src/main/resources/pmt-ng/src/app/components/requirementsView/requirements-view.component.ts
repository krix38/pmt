import { Component } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { RequirementService } from "../../services/requirement.service"


@Component({
  selector: 'requirements-view',
  templateUrl: './requirements-view.component.html',
  styleUrls: ['./requirements-view.component.css']
})
export class RequirementsViewComponent {
  requirements: TreeNode[];

  constructor(private requirementService: RequirementService) {}

  ngOnInit() {
        this.requirementService.requirementTree.subscribe(
          requirements => {
            this.requirements = requirements;
          }
        )
      }

}
