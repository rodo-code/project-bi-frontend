import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NavigationComponent} from './components/navigation/navigation.component';
const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'bolivia',
        component: DashboardComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
