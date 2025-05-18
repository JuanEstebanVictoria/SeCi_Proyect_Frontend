import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
// @ts-ignore
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 🔽 AÑADE ESTOS:
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    // Para los formularios
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
