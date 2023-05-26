import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {
  CommonModule,
  RoutingModule,
  MaterialModule,
  LibraryModule
} from './modules';
import {
  HomeComponent,
  FooterComponent,
  TasksComponent,
  SnackbarComponent,
  PaymentComponent,
  HeaderComponent
} from './components';
import {
  FormComponent
} from './components/shared';
import {
  CapitalizePipe
} from './pipes';
import { TableComponent } from './components/shared/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    FormComponent,
    TasksComponent,
    SnackbarComponent,
    PaymentComponent,
    HeaderComponent,
    CapitalizePipe,
    TableComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    MaterialModule,
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
