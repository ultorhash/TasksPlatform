import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {
  CommonModule,
  RoutingModule,
  MaterialModule
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
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    RoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
