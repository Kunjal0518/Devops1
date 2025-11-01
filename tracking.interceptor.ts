import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

/**
 * HTTP Interceptor that adds a unique correlation ID to each outgoing request.
 * This enables end-to-end traceability from the client through the backend systems.
 */
@Injectable()
export class TrackingInterceptor implements HttpInterceptor {
  /**
   * Intercepts HTTP requests and adds X-Correlation-ID header with a unique UUID.
   * @param req - The outgoing HTTP request
   * @param next - The next handler in the interceptor chain
   * @returns Observable of the HTTP event
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Generate a unique tracking ID for this request
    const trackingId = uuidv4();
    
    // Clone the request and add the X-Correlation-ID header
    const authReq = req.clone({
      headers: req.headers.set('X-Correlation-ID', trackingId)
    });
    
    // Optional: Log the tracking ID for debugging purposes
    console.log(`[TrackingInterceptor] Request to ${req.url} with Correlation-ID: ${trackingId}`);
    
    // Pass the cloned request to the next handler
    return next.handle(authReq);
  }
}
