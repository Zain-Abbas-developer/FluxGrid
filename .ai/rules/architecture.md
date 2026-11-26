
# FluxGrid Architecture Rules

## Architecture Principle

FluxGrid uses a modular backend architecture.

Preferred request flow:

```text
Client
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Model / Database