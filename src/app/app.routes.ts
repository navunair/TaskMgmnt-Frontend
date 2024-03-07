import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { logoutGuard } from './guards/logout.guard';
import { authGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
    {path:'', component: SignInComponent},
    { path: 'signup', component: SignUpComponent, canActivate:[logoutGuard]  },
    { path: 'signin', component: SignInComponent, canActivate:[logoutGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: 'projects', component: ProjectComponent, canActivate: [authGuard] },
    { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
    {path:'**', component: PageNotFoundComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
