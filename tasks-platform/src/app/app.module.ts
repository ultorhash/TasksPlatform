import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  CommonModule,
  RoutingModule,
  MaterialModule,
  LibraryModule
} from '@modules';
import {
  HomeComponent,
  FooterComponent,
  TasksComponent,
  SnackbarComponent,
  PaymentComponent,
  HeaderComponent
} from '@components';
import {
  FormComponent,
  TableComponent,
  ButtonComponent
} from '@components/shared';
import {
  CapitalizePipe,
  CastPipe
} from '@pipes';
import { NgxsModule } from '@ngxs/store';
import { AccountState } from '@store/state';

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
    LibraryModule,
    NgxsModule.forRoot([
      AccountState
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
