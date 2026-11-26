
# FluxGrid Database Context

## Database

MongoDB.

## Primary Responsibilities

MongoDB stores persistent application state.

Potential domains include:

- Users
- Organizations
- Jobs
- Job executions
- Job history
- Permissions
- Audit records
- System configuration

## Repository Pattern

Database operations should normally be performed through repositories.

```text
Service
   ↓
Repository
   ↓
Model
   ↓
MongoDB