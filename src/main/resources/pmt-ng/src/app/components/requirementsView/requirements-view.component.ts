import { Component } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { RegulationService } from "../../services/regulation.service"


@Component({
  selector: 'requirements-view',
  templateUrl: './requirements-view.component.html',
  styleUrls: ['./requirements-view.component.css']
})
export class RequirementsViewComponent {
  regulations: TreeNode[];

  constructor(private regulationService: RegulationService) {}

  ngOnInit() {
        this.regulationService.requirements.subscribe(
          requirements => {
            this.regulations = requirements;
          }
        )
      }

}
