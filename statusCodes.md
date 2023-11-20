404 -> Not Found

### 1xx Informational:

100 Continue: The server has received the request headers and the client should proceed to send the request body.

### 2xx Success:

200 OK: The request was successful.
201 Created: The request was successful, and a new resource was created.
204 No Content: The request was successful, but there is no additional information to send back.
3xx Redirection:

301 Moved Permanently: The requested resource has been permanently moved to another location.
302 Found (or 303 See Other): The requested resource has been temporarily moved to another location.

### 4xx Client Error:

400 Bad Request: The server cannot process the request due to a client error (e.g., malformed request).
401 Unauthorized: The request requires user authentication.
403 Forbidden: The server understood the request, but it refuses to authorize it.
404 Not Found: The requested resource could not be found.
409 Conflict: The user to register already exists

### 5xx Server Error:

500 Internal Server Error: A generic error message indicating that the server has encountered a situation it doesn't know how to handle.
502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed.
503 Service Unavailable: The server is not ready to handle the request. Common causes are a server that is down for maintenance or is overloaded.

### Other notable codes:

429 Too Many Requests: The user has sent too many requests in a given amount of time.
451 Unavailable For Legal Reasons: The server is denying access to the resource as a consequence of a legal demand.
