# Angular Client Error Tracking Implementation

## Overview
This implementation addresses the non-compliance issue **R.nfr.error-handling.2.4** by adding client-side error tracking with correlation IDs to enable end-to-end traceability.

## Solution Components

### 1. TrackingInterceptor (`tracking.interceptor.ts`)
- Implements Angular's `HttpInterceptor` interface
- Automatically generates a unique UUID v4 for each outgoing HTTP request
- Adds the `X-Correlation-ID` header to all requests
- Enables tracing from the client through the entire backend system

### 2. Module Configuration (`app.module.ts`)
- Registers the `TrackingInterceptor` in the providers array
- Uses `HTTP_INTERCEPTORS` token with `multi: true` to allow multiple interceptors
- Ensures the interceptor is applied to all HTTP requests made via `HttpClient`

### 3. Dependencies (`package.json`)
- Includes `uuid` library (v9.0.0) for generating RFC4122 compliant UUIDs
- Includes `@types/uuid` for TypeScript type definitions

### 4. Example Service (`loan-search.service.ts`)
- Demonstrates how services work seamlessly with the interceptor
- No manual header manipulation required
- All HTTP methods (GET, POST, PUT, DELETE) automatically include correlation IDs

## How It Works

1. **Request Initiation**: When any Angular service makes an HTTP request using `HttpClient`
2. **Interception**: The `TrackingInterceptor` intercepts the request before it's sent
3. **ID Generation**: A unique UUID is generated using the `uuid` library
4. **Header Injection**: The UUID is added as the `X-Correlation-ID` header
5. **Request Forwarding**: The modified request is sent to the backend
6. **Backend Processing**: The backend can extract the correlation ID from the header and include it in logs (using MDC or similar)
7. **End-to-End Tracing**: The same correlation ID can be traced from the client through all backend services

## Installation

```bash
# Install dependencies
npm install uuid
npm install --save-dev @types/uuid
```

## Usage

Once the interceptor is registered in `app.module.ts`, all HTTP requests automatically include the correlation ID. No changes are needed in existing service files.

### Example Request
```typescript
// Before (non-compliant)
this.http.post(this.url, criteria, { headers: this.headers });

// After (compliant) - Same code, but correlation ID is added automatically
this.http.post(this.url, criteria, { headers: this.headers });
```

### Request Headers (Automatic)
```
POST /api/loans/search HTTP/1.1
Content-Type: application/json
X-Correlation-ID: 550e8400-e29b-41d4-a716-446655440000
```

## Benefits

1. **End-to-End Traceability**: Track user actions from the browser through all backend services
2. **Debugging**: Quickly identify and trace issues across distributed systems
3. **Monitoring**: Correlate frontend and backend logs for comprehensive observability
4. **Compliance**: Meets the requirement for client-side error tracking
5. **Zero Service Changes**: Existing services work without modification

## Backend Integration

Ensure your backend is configured to:
1. Extract the `X-Correlation-ID` header from incoming requests
2. Include it in logging context (e.g., MDC in Java/Spring Boot)
3. Propagate it to downstream services
4. Return it in error responses for client-side correlation

## Testing

To verify the implementation:
1. Open browser developer tools (Network tab)
2. Make any HTTP request from the application
3. Inspect the request headers
4. Verify the presence of `X-Correlation-ID` header with a UUID value

## Compliance Status

✅ **COMPLIANT** - This implementation fully addresses the non-compliance issue by:
- Generating unique tracking IDs on the client side
- Passing them in request headers (`X-Correlation-ID`)
- Enabling end-to-end traceability from the user's browser through the backend
