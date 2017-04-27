import { Component, ViewChild } from '@angular/core';
import { CreateRegulationDialogComponent }
  from '../createRegulationDialog/create-regulation-dialog.component'
import { CreateTopicDialogComponent }
    from '../createTopicDialog/create-topic-dialog.component'
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'requirements-toolbox',
  templateUrl: './requirements-toolbox.component.html',
  styleUrls: ['./requirements-toolbox.component.css']
})
export class RequirementsToolboxComponent {
  private items: MenuItem[];

    @ViewChild(CreateRegulationDialogComponent) regulationDialog;
    @ViewChild(CreateTopicDialogComponent) topicDialog;


    createRegulation() {
      this.regulationDialog.showDialog();
    }

    createTopic() {
      this.topicDialog.showDialog();
    }

    ngOnInit() {
      this.items = [
                    {
                      label: 'Add regulation',
                      command: this.createRegulation.bind(this),
                      icon: 'fa-plus'
                    },
                    {
                      label: 'Add topic',
                      command: this.createTopic.bind(this),
                      icon: 'fa-plus'
                    }
                ];


    }

}
