import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { tokenInterceptor } from './auth/token.interceptor'; // Importez votre intercepteur
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers:  [
                { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
                provideZoneChangeDetection({ eventCoalescing: true }), 
                provideRouter(routes), 
                importProvidersFrom(ReactiveFormsModule),
                provideClientHydration(withEventReplay()),
                provideHttpClient(
                  withFetch(),
                  withInterceptors([tokenInterceptor])
                )
              ]
};
