import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ErrorComponent } from '../components/error/error.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDirective } from '../directive/confirm.directive';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ErrorComponent,
    SidebarComponent,
    AddUserComponent,
    SpinnerComponent,
    ConfirmDirective,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [AppRoutingModule, BrowserModule, CommonModule],
})
export class UserModule {}
