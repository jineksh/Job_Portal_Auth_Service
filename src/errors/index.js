
export class ApiError extends Error {
  constructor(message, statusCode = 500) {
    
    super(message);
    
    // Set error name to class name
    this.name = this.constructor.name;
    // HTTP status code for API responses
    this.statusCode = statusCode; 
    // Whether this is an operational error (expected) or programming error (bug)
    this.isOperational = true;
    // Timestamp when error occurred
    this.timestamp = new Date().toISOString();
 
    // Captures stack trace (excludes constructor call from stack)
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends ApiError {
  constructor(message, field = null) {
    // 400 = Bad Request (client error)
    super(message, 400);
    
    // Store which field failed validation
    this.field = field;
    
    // Additional validation details
    this.errors = [];
  }
  
  // Method to add multiple validation errors
  addError(field, message) {
    this.errors.push({ field, message });
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    // 404 = Not Found
    super(`${resource} not found`, 404);
    this.resource = resource;
  }
}

export class DatabaseError extends ApiError {
  constructor(message, operation = null, query = null) {
    // 500 = Internal Server Error
    super(message, 500);
    
    // Store what operation failed (SELECT, INSERT, UPDATE, DELETE)
    this.operation = operation;
    
    // Store query that failed (for logging, not for client)
    this.query = query;
  }
}

export class ExternalServiceError extends ApiError {
  constructor(service, message, originalError = null) {
    // 503 = Service Unavailable
    super(`${service} error: ${message}`, 503);
    
    // Store which external service failed
    this.service = service;
    
    // Store original error from external service
    this.originalError = originalError;
  }
}