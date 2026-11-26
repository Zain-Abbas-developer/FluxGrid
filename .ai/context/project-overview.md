
# FluxGrid Project Overview

## Product

FluxGrid is a job workflow and asynchronous processing platform.

## Primary Goal

Provide a scalable platform for creating, processing, monitoring, and managing asynchronous jobs.

## Core Capabilities

- Job creation
- Job execution
- Queue management
- Worker processing
- Retry handling
- Dead-letter queues
- Real-time status
- Role-based access
- Organization management
- System health
- Monitoring
- Performance testing

## Target Architecture

```text
Frontend
   |
   v
Backend API
   |
   +---- MongoDB
   |
   +---- Redis
           |
           v
        BullMQ
           |
     +-----+-----+
     |     |     |
 Worker Worker Worker