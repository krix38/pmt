import { Component, ViewChild } from '@angular/core';
import { CreateRegulationDialogComponent }
  from '../createRegulationDialog/create-regulation-dialog.component'
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'creator-menu',
  templateUrl: './creator-menu.component.html',
  styleUrls: ['./creator-menu.component.css']
})
export class CreatorMenuComponent {
  private items: MenuItem[];

    @ViewChild(CreateRegulationDialogComponent) regulationDialog;

    createRegulation() {
      this.regulationDialog.showDialog();
    }

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                items: [
                        {
                           label: 'Regulation',
                           command: this.createRegulation.bind(this)
                        },
                        {label: 'Topic'}
                        ]
            },
            {label: 'Import'},
            {label: 'Quit'}
        ]
    }

}
