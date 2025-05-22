import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';


bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    provideHttpClient(),
    providePrimeNG({ theme: { preset: Aura } }),
    importProvidersFrom(ToastrModule.forRoot())
  ]
});
