import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';
import { ErrorComponent } from './user/components/error/error.component';
import { AddUserComponent } from './user/components/add-user/add-user.component';

const routes: Routes = [
  { path: 'user', component: DashboardComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'emp-entry', component: AddUserComponent, pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
