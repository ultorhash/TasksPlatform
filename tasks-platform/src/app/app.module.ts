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
  HeaderComponent
} from '@components';
import {
  FormComponent,
  TableComponent,
  ButtonComponent,
  ModalComponent
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
    HeaderComponent,
    TableComponent,
    ButtonComponent,
    ModalComponent,
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
