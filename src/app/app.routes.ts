import { Routes } from '@angular/router';
import {StartComponent} from './components/start/start.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import { RecoveryCodeComponent } from './components/recovery-code/recovery-code.component';
import {MainDashboardComponent} from './components/main-dashboard/main-dashboard.component';
import {CreateReportComponent} from './components/create-report/create-report.component';
import {CorrectReportComponent} from './components/correct-report/correct-report.component';
import {ReportDetailsComponent} from './components/report-details/report-details.component';
import {ProfileSettingsComponent} from './components/profile-settings/profile-settings.component';
import {NotificationListComponent} from './components/notification-list/notification-list.component';


export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'recovery-code', component: RecoveryCodeComponent },
  { path: 'dashboard', component: MainDashboardComponent },
  { path: 'report/create', component: CreateReportComponent },
  { path: 'report/correct/:id', component: CorrectReportComponent },
  { path: 'report/:id', component: ReportDetailsComponent },
  { path: 'notifications', component: NotificationListComponent },
  { path: 'settings', component: ProfileSettingsComponent },
];
