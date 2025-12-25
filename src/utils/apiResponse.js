class ApiResponse {
    /**
     * @constructor
     * @param {number} statusCode - HTTP status code (e.g., 200, 201).
     * @param {any} data - The actual data payload to be sent to the client.
     * @param {string} message - A short, descriptive success message.
     */
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        // Success is true if status code is less than 400
        this.success = statusCode < 400
    }
}


export default ApiResponse;
