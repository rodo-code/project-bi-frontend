import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuardGuard } from '../guards/admin/admin-guard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuardGuard],
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
