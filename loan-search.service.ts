import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for loan search operations.
 * The TrackingInterceptor automatically adds X-Correlation-ID header to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class LoanSearchService {
  private url = '/api/loans/search';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  /**
   * Searches for loans based on the provided criteria.
   * The X-Correlation-ID header is automatically added by the TrackingInterceptor.
   * @param criteria - The search criteria
   * @returns Observable of the search results
   */
  searchLoans(criteria: any): Observable<any> {
    // No need to manually add X-Correlation-ID header
    // The TrackingInterceptor handles it automatically
    return this.http.post(this.url, criteria, { headers: this.headers });
  }

  /**
   * Gets loan details by ID.
   * The X-Correlation-ID header is automatically added by the TrackingInterceptor.
   * @param loanId - The loan ID
   * @returns Observable of the loan details
   */
  getLoanById(loanId: string): Observable<any> {
    return this.http.get(`${this.url}/${loanId}`, { headers: this.headers });
  }

  /**
   * Updates loan information.
   * The X-Correlation-ID header is automatically added by the TrackingInterceptor.
   * @param loanId - The loan ID
   * @param data - The updated loan data
   * @returns Observable of the update result
   */
  updateLoan(loanId: string, data: any): Observable<any> {
    return this.http.put(`${this.url}/${loanId}`, data, { headers: this.headers });
  }
}
