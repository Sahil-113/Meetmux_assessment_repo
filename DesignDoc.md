# Design Document

## Overview
This microservice system consists of:
1. User Service — manages user data.
2. Order Service — manages orders linked to users.

## Inter-Service Communication
The Order Service communicates with the User Service via HTTP using Axios.

## Failure Handling
- If user not found → returns 404 error, order creation aborted.
- If User Service is down → returns 500 internal error.

## Future Enhancements
- Use a message queue (e.g., RabbitMQ)
- Add MongoDB for persistence
- Add authentication
