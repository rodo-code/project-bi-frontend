import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardGuard } from '../guards/admin/admin-guard.guard';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CaseFormComponent } from './components/case-form/case-form.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuardGuard],
    component: NavigationComponent,
    children: [
      {
        path: 'create',
        component: CaseFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
