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
  FormComponent,
  TableComponent,
  ButtonComponent
} from './components/shared';
import {
  CapitalizePipe,
  CastPipe
} from './pipes';

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
    TableComponent,
    ButtonComponent,
    CapitalizePipe,
    CastPipe
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
