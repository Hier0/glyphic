# Backend Architecture

## Overview

Glyphic is designed as an open-source workflow automation platform similar to n8n or Gumloop. This document outlines the backend architecture requirements and recommendations for building a scalable, maintainable system.

## Backend Requirements

### Core Functionality

1. **Workflow Management**
   - Store workflow definitions (nodes, edges, configurations)
   - Version control for workflows
   - Workflow execution history and logs
   - Workflow sharing and collaboration

2. **Execution Engine**
   - Queue and execute workflows
   - Handle async job processing
   - Manage workflow state during execution
   - Retry and error handling

3. **User Management**
   - Authentication and authorization
   - User preferences and settings
   - Team/organization management (if multi-tenant)

4. **Integration Management**
   - Store OAuth tokens and API credentials (encrypted)
   - Manage integration configurations
   - Handle webhook endpoints

5. **Data Storage**
   - Workflow execution results
   - Temporary data during workflow runs
   - File attachments and media

## Backend Options

### Option 1: Supabase (Recommended for MVP)

**Pros:**
- ✅ **PostgreSQL Database**: Robust relational database with JSON support
- ✅ **Built-in Auth**: Authentication and authorization out of the box
- ✅ **Real-time Subscriptions**: WebSocket support for live workflow execution updates
- ✅ **Storage**: Built-in file storage for attachments
- ✅ **Edge Functions**: Serverless functions for workflow execution
- ✅ **Row Level Security (RLS)**: Fine-grained access control
- ✅ **JSON/JSONB Support**: Perfect for storing workflow definitions as JSON blobs
- ✅ **Rapid Development**: Quick setup and deployment
- ✅ **Open Source**: Self-hostable option available
- ✅ **Cost Effective**: Generous free tier, reasonable pricing

**Cons:**
- ⚠️ **Vendor Lock-in**: Some Supabase-specific features
- ⚠️ **Execution Limits**: Edge functions have timeout limits (may need external workers)
- ⚠️ **Complex Workflows**: May need additional queue system for long-running workflows

**Best For:**
- MVP and early-stage development
- Teams wanting rapid iteration
- Applications with moderate execution complexity
- Projects prioritizing developer experience

### Option 2: Self-Hosted PostgreSQL + Node.js/Python Backend

**Pros:**
- ✅ **Full Control**: Complete control over infrastructure
- ✅ **No Vendor Lock-in**: Standard technologies
- ✅ **Flexible Execution**: Can handle long-running workflows
- ✅ **Custom Queue System**: Use Bull, Celery, or similar
- ✅ **Cost Predictable**: Fixed infrastructure costs

**Cons:**
- ⚠️ **More Setup**: Requires more initial configuration
- ⚠️ **Maintenance**: You manage scaling, backups, monitoring
- ⚠️ **Auth Implementation**: Need to build auth system
- ⚠️ **More Complex**: More moving parts to manage

**Best For:**
- Production systems with specific requirements
- Teams with DevOps expertise
- High-volume or complex execution needs
- Maximum control and customization

### Option 3: Hybrid Approach (Supabase + External Workers)

**Pros:**
- ✅ **Best of Both Worlds**: Supabase for data/auth, external workers for execution
- ✅ **Scalable Execution**: Use dedicated worker infrastructure
- ✅ **Flexible**: Can scale workers independently

**Cons:**
- ⚠️ **More Complex**: Multiple systems to manage
- ⚠️ **Higher Cost**: Multiple services

**Best For:**
- Production systems that need Supabase benefits but require robust execution
- Teams that want managed database/auth but custom execution logic

## Recommended Architecture: Supabase + Worker Queue

### Components

1. **Supabase (Primary Backend)**
   - PostgreSQL database for all persistent data
   - Authentication and user management
   - Real-time subscriptions for UI updates
   - File storage for attachments
   - Edge functions for lightweight operations

2. **Workflow Execution Workers**
   - Separate service (Node.js/Python) for executing workflows
   - Can be deployed on:
     - Railway, Render, Fly.io (managed)
     - Kubernetes cluster (self-hosted)
     - AWS ECS, Google Cloud Run (cloud)
   - Communicates with Supabase via API
   - Uses job queue (Redis + Bull, or similar)

3. **Queue System**
   - Redis for job queue
   - Bull (Node.js) or Celery (Python) for job management
   - Handles retries, priorities, scheduling

4. **Optional: Webhook Server**
   - Dedicated server for receiving webhooks
   - Can be integrated into worker service
   - Handles incoming triggers for workflows

### Data Flow

```
User Action (Frontend)
    ↓
Supabase API (Create/Update Workflow)
    ↓
Supabase Database (Store Workflow JSON)
    ↓
User Triggers Execution
    ↓
Supabase Edge Function / API Endpoint
    ↓
Queue System (Redis + Bull)
    ↓
Worker Service (Execute Workflow)
    ↓
Update Supabase (Execution Status, Results)
    ↓
Real-time Update to Frontend (via Supabase Realtime)
```

## Implementation Strategy

### Phase 1: MVP with Supabase Only

1. Use Supabase for all data storage
2. Store workflows as JSONB in PostgreSQL
3. Use Supabase Edge Functions for simple workflow execution
4. Use Supabase Realtime for live updates
5. Basic auth with Supabase Auth

### Phase 2: Add Worker Queue

1. Deploy separate worker service
2. Implement Redis + Bull queue
3. Move complex/long-running workflows to workers
4. Keep Supabase for data and auth
5. Workers update Supabase with results

### Phase 3: Scale and Optimize

1. Add horizontal scaling for workers
2. Implement workflow scheduling
3. Add monitoring and observability
4. Optimize database queries
5. Add caching layer if needed

## Key Considerations

### Workflow Storage Format

Workflows should be stored as JSON blobs (similar to ComfyUI format) in PostgreSQL JSONB columns. This allows:
- Flexible schema evolution
- Easy versioning
- Efficient querying with PostgreSQL JSON operators
- Full workflow definition in one place

See `DATA_MODEL.md` for detailed schema.

### Execution Model

- **Synchronous**: Simple workflows that complete quickly (< 30s)
  - Can use Supabase Edge Functions
  - Direct API response
  
- **Asynchronous**: Complex or long-running workflows
  - Queue job in Redis
  - Worker picks up and executes
  - Update status via Supabase API
  - Frontend polls or uses realtime subscriptions

### Security

- **Encrypted Storage**: OAuth tokens and API keys must be encrypted at rest
- **Row Level Security**: Use Supabase RLS for multi-tenant isolation
- **API Keys**: Secure API key management for integrations
- **Webhook Security**: Validate webhook signatures
- **Rate Limiting**: Prevent abuse of execution endpoints

### Scalability

- **Database**: Supabase PostgreSQL can scale, but consider read replicas for heavy read workloads
- **Workers**: Horizontal scaling of worker instances
- **Queue**: Redis can be clustered for high throughput
- **Caching**: Redis for frequently accessed data
- **CDN**: For static assets and file downloads

## Technology Stack Recommendations

### Database
- **Primary**: PostgreSQL (via Supabase or self-hosted)
- **Queue**: Redis
- **Optional Cache**: Redis (same instance)

### Backend Services
- **API/Edge Functions**: TypeScript/Node.js (Supabase Edge Functions)
- **Workers**: Node.js (with Bull) or Python (with Celery)
- **Webhooks**: Node.js/Express or Python/FastAPI

### Infrastructure
- **Hosting**: Supabase (managed) or self-hosted PostgreSQL
- **Workers**: Railway, Render, Fly.io, or Kubernetes
- **Queue**: Redis Cloud, Upstash, or self-hosted Redis
- **Monitoring**: Sentry, Datadog, or self-hosted Prometheus

## Migration Path

If starting with Supabase and later needing more control:

1. **Phase 1**: Full Supabase (MVP)
2. **Phase 2**: Supabase + External Workers (Scale execution)
3. **Phase 3**: Self-hosted PostgreSQL + Workers (If needed for compliance/cost)

The data model can remain largely the same, making migration straightforward.

## Conclusion

**For Glyphic, Supabase is an excellent choice** because:

1. ✅ JSONB support is perfect for workflow JSON storage
2. ✅ Built-in auth reduces development time
3. ✅ Real-time features enable live workflow monitoring
4. ✅ Can start simple and add workers later
5. ✅ Open source option available for self-hosting
6. ✅ Cost-effective for early stages
7. ✅ Excellent developer experience

The recommended approach is to **start with Supabase for MVP**, then **add external workers** when you need more robust execution capabilities. This gives you the best balance of speed to market and scalability.

