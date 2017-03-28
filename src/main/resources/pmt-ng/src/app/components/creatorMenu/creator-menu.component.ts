import { Component } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'creator-menu',
  templateUrl: './creator-menu.component.html',
  styleUrls: ['./creator-menu.component.css']
})
export class CreatorMenuComponent {
  private items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                items: [
                        {label: 'Regulation'},
                        {label: 'Topic'}
                        ]
            },
            {label: 'Import'},
            {label: 'Quit'}
        ]
    }

}
