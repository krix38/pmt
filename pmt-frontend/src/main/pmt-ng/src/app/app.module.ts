import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PasswordModule,
         InputTextModule,
         PanelModule,
         ButtonModule,
         MenuModule,
         TabViewModule,
         DialogModule,
         TreeModule,
         DropdownModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'
import { CreatorComponent } from './components/creator/creator.component'
import { RequirementsToolboxComponent } from './components/requirementsToolbox/requirements-toolbox.component'
import { CreateRegulationDialogComponent }
  from './components/createRegulationDialog/create-regulation-dialog.component'
import { CreateTopicDialogComponent }
    from './components/createTopicDialog/create-topic-dialog.component'
import { EditTopicDialogComponent }
    from './components/editTopicDialog/edit-topic-dialog.component'
import { EditRegulationDialogComponent }
    from './components/editRegulationDialog/edit-regulation-dialog.component'
import { CreatorTabMenuComponent } from './components/creatorTabMenu/creator-tab-menu.component'
import { RequirementsViewComponent } from './components/requirementsView/requirements-view.component'


import { AuthGuard }                from './services/auth-guard.service';
import { AuthService }                from './services/auth.service';
import { RequirementService }    from "./services/requirement.service";
import { AppRoutingModule }     from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatorComponent,
    RequirementsToolboxComponent,
    CreateRegulationDialogComponent,
    CreateTopicDialogComponent,
    CreatorTabMenuComponent,
    RequirementsViewComponent,
    EditTopicDialogComponent,
    EditRegulationDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    MenuModule,
    TabViewModule,
    DialogModule,
    TreeModule,
    DropdownModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    RequirementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
