# Security Policy

## Security Philosophy

Security is a core requirement of FluxGrid.

Security-related changes should be considered during architecture, development, testing, and deployment.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest | Yes |
| Older versions | Best effort |

## Reporting a Vulnerability

If you discover a security vulnerability, do not publicly disclose the vulnerability before it has been investigated.

Report the issue privately to the project maintainers at **[security@your-domain.com]** (or via GitHub Private Vulnerability Reporting).

Please include:

- Vulnerability description
- Affected component
- Steps to reproduce
- Potential impact
- Suggested mitigation (if available)

You can expect an initial acknowledgment within **48 hours** and regular status updates until the issue is resolved.

## Do Not Include

Do not publicly share:

- API keys
- Passwords
- Access tokens
- Private keys
- Production credentials
- Personal data
- Database credentials

## Security Practices

FluxGrid follows these principles:

### Authentication

Authentication must be handled securely.

### Authorization

Authorization must be enforced on the backend.

Frontend restrictions alone are not considered sufficient security.

### Input Validation

External input must be validated before processing.

### Secrets

Secrets must be provided through environment variables or a secure secret-management system.

### Database Security

Database credentials must never be committed to source control.

### Dependencies

Dependencies should be regularly reviewed and updated.

### Logging

Logs must not expose sensitive information.

### Error Handling

Production errors should avoid exposing internal implementation details.

### Rate Limiting

Public and sensitive endpoints should use appropriate rate limiting.

## Security Review

Security-sensitive changes should be reviewed before production deployment.
