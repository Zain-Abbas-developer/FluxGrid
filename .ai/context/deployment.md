
# FluxGrid Deployment Context

## Production Components

The production environment may contain:

```text
Load Balancer
      |
      v
API Instances
      |
      +-------- MongoDB
      |
      +-------- Redis
                   |
                   v
              Queue System
                   |
             +-----+-----+
             |     |     |
           Worker Worker Worker