# FluxGrid Database Rules

## Database

FluxGrid uses MongoDB for persistent application data.

## Rules

1. Keep database access inside repositories.
2. Use appropriate indexes.
3. Validate required fields.
4. Avoid unnecessary database queries.
5. Avoid N+1 query patterns.
6. Use pagination for large collections.
7. Do not store secrets in plain text.
8. Use transactions when required by business consistency.
9. Keep schemas explicit.
10. Document important indexes.

## Performance

Before optimizing, identify the actual bottleneck.

Consider:

- Query execution
- Index usage
- Collection size
- Pagination
- Projection
- Connection pooling

## Data Integrity

Business rules should be enforced at the service layer and database layer where appropriate.