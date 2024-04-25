import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsComponent } from './pages/static/dialogue/dialogue.component';
import { DetailsComponent } from './pages/static/details/details.component';
import { CollapseModule } from 'ng-uikit-pro-standard';
//import { ShareDiaComponent } from './pages/static/share-dia/share-dia.component';
import { ValidationComponent } from './pages/validation/validation.component';
import { RejectDiaComponent } from './pages/validation/reject-dia/reject-dia.component';
import { ValidDiaComponent } from './pages/validation/valid-dia/valid-dia.component';
import { ToastrModule } from 'ngx-toastr';
import { ShareComponent } from './pages/validation/share/share.component';
//import { ValidDiaComponent } from './pages/validation/valid-dia/valid-dia.component';
//import { MdbTabsModule, MdbTabModule } from 'angular-bootstrap-md';
//import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    CollapseModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot()
    //MdbTabsModule,
    //MdbTabModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    //DialogsComponent,

    ValidationComponent,
    RejectDiaComponent,
    ValidDiaComponent,
    ShareComponent,
    //ValidDiaComponent,
    //ShareDiaComponent,
    //DetailsComponent,
    //DetailsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
