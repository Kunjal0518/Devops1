import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TrackingInterceptor } from './tracking.interceptor';

/**
 * Root module of the Angular application.
 * Configures the TrackingInterceptor to add correlation IDs to all HTTP requests.
 */
@NgModule({
  declarations: [
    AppComponent
    // Add your other components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    // Add your other modules here
  ],
  providers: [
    // Register the TrackingInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TrackingInterceptor,
      multi: true
    }
    // Add your other providers here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
