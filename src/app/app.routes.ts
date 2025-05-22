import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RecoveryCodeComponent } from './components/recovery-code/recovery-code.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { CreateReportComponent } from './components/create-report/create-report.component';
import { CorrectReportComponent } from './components/correct-report/correct-report.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';

import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { rolesGuard } from './guards/roles.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Tu landing visual
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'recovery-code', component: RecoveryCodeComponent },

  // Dashboard y funciones internas
  { path: 'dashboard', component: MainDashboardComponent, canActivate: [authGuard] },
  { path: 'report/create', component: CreateReportComponent, canActivate: [authGuard] },
  { path: 'report/correct/:id', component: CorrectReportComponent, canActivate: [authGuard] },
  { path: 'report/:id', component: ReportDetailsComponent, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationListComponent, canActivate: [authGuard] },
  { path: 'settings', component: ProfileSettingsComponent, canActivate: [authGuard] },

  // Redirección de sesión activa
  { path: 'home', component: HomeComponent },

  // Roles protegidos
  { path: 'home-user', component: HomeUserComponent, canActivate: [rolesGuard], data: { expectedRoles: ['USER'] } },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [rolesGuard], data: { expectedRoles: ['ADMIN'] } },

  { path: 'unauthorized', component: UnauthorizedComponent },

  // Página no encontrada
  { path: '**', redirectTo: '' }
];
