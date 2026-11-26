# FluxGrid Security Rules

## Core Principle

Security must be enforced server-side.

## Never

- Hard-code secrets.
- Commit `.env`.
- Log passwords.
- Log access tokens.
- Trust client-provided roles.
- Trust frontend authorization.
- Disable validation to fix errors.
- Return sensitive database information.

## Authentication

Authentication must verify user identity securely.

## Authorization

Every protected resource must verify permissions.

## Input

All external input must be validated.

## API Security

Consider:

- Rate limiting
- CORS
- Security headers
- Authentication
- Authorization
- Request validation
- Payload limits

## Error Messages

Production responses must not expose:

- Stack traces
- Database credentials
- Internal file paths
- Secrets
- Internal service details

## Dependencies

Security-sensitive dependencies must be kept updated and audited.