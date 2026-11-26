
# FluxGrid Backend Rules

## Language

Use TypeScript.

## General Rules

- Prefer explicit types.
- Avoid unnecessary `any`.
- Use async/await.
- Handle errors explicitly.
- Validate external input.
- Keep controllers thin.
- Keep services focused.
- Keep database access inside repositories.

## API

API responses should be consistent.

Use appropriate HTTP status codes.

Errors should not expose internal implementation details in production.

## Authentication

Authentication must be handled through the established authentication mechanism.

Never hard-code tokens or credentials.

## Authorization

Authorization must be enforced on the backend.

Frontend visibility is not a security boundary.

## Error Handling

Use centralized error handling where possible.

Do not silently swallow errors.

## Logging

Logs should contain useful diagnostic information without exposing:

- Passwords
- Tokens
- API keys
- Sensitive personal information
- Database credentials

## Async Processing

Long-running tasks should not block HTTP requests when asynchronous processing is appropriate.

Use the queue system for background workloads.