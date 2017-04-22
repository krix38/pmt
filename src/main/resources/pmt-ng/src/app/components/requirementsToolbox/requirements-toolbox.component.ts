import { Component, ViewChild } from '@angular/core';
import { CreateRegulationDialogComponent }
  from '../createRegulationDialog/create-regulation-dialog.component'
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'requirements-toolbox',
  templateUrl: './requirements-toolbox.component.html',
  styleUrls: ['./requirements-toolbox.component.css']
})
export class RequirementsToolboxComponent {
  private items: MenuItem[];

    @ViewChild(CreateRegulationDialogComponent) regulationDialog;

    createRegulation() {
      this.regulationDialog.showDialog();
    }

    ngOnInit() {
      this.items = [
                    {label: 'New', command: this.createRegulation.bind(this), icon: 'fa-plus'},
                    {label: 'Open', icon: 'fa-download'},
                    {label: 'Undo', icon: 'fa-refresh'}
                ];


    }

}
