# Data Model

## Overview

This document defines the database schema and data structures for Glyphic. The design prioritizes flexibility for workflow definitions (stored as JSON blobs similar to ComfyUI format) while maintaining relational integrity for user management, execution tracking, and metadata.

## Design Principles

1. **JSON-First Workflows**: Workflow definitions stored as JSONB blobs for flexibility
2. **Version Control**: Track workflow changes over time
3. **Execution Tracking**: Comprehensive logging and result storage
4. **Multi-Tenancy**: Support for teams/organizations (optional)
5. **Security**: Encrypted storage for sensitive credentials
6. **Performance**: Indexed JSON queries for fast workflow retrieval

## Core Tables

### `users`

User accounts and authentication.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  preferences JSONB DEFAULT '{}'::jsonb
);
```

**Fields:**
- `id`: Unique user identifier
- `email`: User email (from Supabase Auth)
- `name`: Display name
- `avatar_url`: Profile picture URL
- `preferences`: User settings (theme, notifications, etc.) as JSON

**Indexes:**
- `idx_users_email` on `email`

### `workflows`

Main workflow definitions stored as JSON blobs.

```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  workflow_data JSONB NOT NULL, -- ComfyUI-style JSON blob
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  is_public BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_executed_at TIMESTAMPTZ,
  execution_count INTEGER DEFAULT 0
);
```

**Fields:**
- `id`: Unique workflow identifier
- `user_id`: Owner of the workflow
- `name`: Human-readable workflow name
- `description`: Workflow description
- `workflow_data`: **JSON blob containing full workflow definition** (see Workflow JSON Format below)
- `version`: Version number (incremented on updates)
- `is_active`: Whether workflow is enabled
- `is_public`: Whether workflow is shareable
- `tags`: Array of tags for categorization
- `last_executed_at`: Timestamp of last execution
- `execution_count`: Total number of executions

**Indexes:**
- `idx_workflows_user_id` on `user_id`
- `idx_workflows_created_at` on `created_at DESC`
- `idx_workflows_tags` using GIN on `tags`
- `idx_workflows_workflow_data` using GIN on `workflow_data` (for JSON queries)

**Workflow JSON Format:**

The `workflow_data` JSONB column stores workflows in a format similar to ComfyUI:

```json
{
  "id": "uuid-string",
  "revision": 0,
  "last_node_id": 47,
  "last_link_id": 45,
  "nodes": [
    {
      "id": 39,
      "type": "CLIPLoader",
      "pos": [52.59, 458.58],
      "size": [270, 145],
      "data": {
        "label": "Node Label",
        "nodeType": "gmail",
        "fields": {
          "to": "user@example.com",
          "subject": "Hello",
          "messageBody": "Test message"
        }
      },
      "inputs": [],
      "outputs": [
        {
          "name": "output",
          "type": "string",
          "links": [44]
        }
      ]
    }
  ],
  "edges": [
    {
      "id": 36,
      "source": "node-1",
      "sourceHandle": "output",
      "target": "node-2",
      "targetHandle": "input",
      "type": "string"
    }
  ],
  "groups": [],
  "config": {},
  "metadata": {
    "created_by": "user-id",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**Key Differences from ComfyUI:**
- Uses string IDs for nodes (more web-friendly)
- `data.fields` contains node configuration values
- `edges` instead of `links` (React Flow terminology)
- Additional `metadata` for Glyphic-specific info

### `workflow_versions`

Version history for workflows (optional, for audit trail).

```sql
CREATE TABLE workflow_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  workflow_data JSONB NOT NULL,
  change_summary TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workflow_id, version)
);
```

**Fields:**
- `id`: Version record ID
- `workflow_id`: Reference to workflow
- `version`: Version number
- `workflow_data`: Snapshot of workflow at this version
- `change_summary`: Optional description of changes
- `created_by`: User who created this version

**Indexes:**
- `idx_workflow_versions_workflow_id` on `workflow_id, version DESC`

### `executions`

Workflow execution records.

```sql
CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL, -- 'pending', 'running', 'completed', 'failed', 'cancelled'
  trigger_type TEXT, -- 'manual', 'webhook', 'schedule', 'event'
  trigger_data JSONB, -- Data that triggered the execution
  input_data JSONB, -- Input data for the workflow
  output_data JSONB, -- Output data from the workflow
  error_message TEXT,
  error_stack TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Fields:**
- `id`: Execution ID
- `workflow_id`: Workflow that was executed
- `user_id`: User who triggered execution
- `status`: Current execution status
- `trigger_type`: How execution was triggered
- `trigger_data`: Context about the trigger (webhook payload, schedule info, etc.)
- `input_data`: Inputs provided to workflow
- `output_data`: Results from workflow execution
- `error_message`: Error message if failed
- `error_stack`: Stack trace if failed
- `started_at`: When execution began
- `completed_at`: When execution finished
- `duration_ms`: Execution duration in milliseconds

**Indexes:**
- `idx_executions_workflow_id` on `workflow_id, created_at DESC`
- `idx_executions_user_id` on `user_id, created_at DESC`
- `idx_executions_status` on `status, created_at DESC`

### `execution_logs`

Detailed logs for workflow execution (for debugging).

```sql
CREATE TABLE execution_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID NOT NULL REFERENCES executions(id) ON DELETE CASCADE,
  node_id TEXT, -- ID of the node that generated this log
  node_type TEXT,
  level TEXT NOT NULL, -- 'info', 'warn', 'error', 'debug'
  message TEXT NOT NULL,
  data JSONB, -- Additional structured data
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

**Fields:**
- `id`: Log entry ID
- `execution_id`: Execution this log belongs to
- `node_id`: Which node generated the log
- `node_type`: Type of node
- `level`: Log level
- `message`: Log message
- `data`: Additional structured data
- `timestamp`: When log was created

**Indexes:**
- `idx_execution_logs_execution_id` on `execution_id, timestamp`
- `idx_execution_logs_node_id` on `execution_id, node_id`

### `integrations`

OAuth tokens and API credentials for third-party integrations.

```sql
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'gmail', 'slack', 'github', etc.
  name TEXT NOT NULL, -- User-friendly name
  credentials_encrypted BYTEA NOT NULL, -- Encrypted OAuth tokens/API keys
  config JSONB DEFAULT '{}'::jsonb, -- Non-sensitive configuration
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ, -- For OAuth tokens
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Fields:**
- `id`: Integration ID
- `user_id`: Owner of integration
- `type`: Integration type (gmail, slack, etc.)
- `name`: User-assigned name
- `credentials_encrypted`: **Encrypted** OAuth tokens, API keys, etc.
- `config`: Non-sensitive settings (default channels, etc.)
- `is_active`: Whether integration is enabled
- `expires_at`: OAuth token expiration
- `created_at`, `updated_at`: Timestamps

**Indexes:**
- `idx_integrations_user_id` on `user_id, type`
- `idx_integrations_type` on `type`

**Security Note:** 
- `credentials_encrypted` must be encrypted using application-level encryption (e.g., AES-256)
- Never store plaintext credentials
- Use Supabase Vault or similar for encryption keys

### `webhooks`

Webhook endpoints for triggering workflows.

```sql
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  path TEXT NOT NULL UNIQUE, -- URL path: /webhooks/{path}
  secret TEXT NOT NULL, -- For signature validation
  method TEXT DEFAULT 'POST', -- HTTP method
  is_active BOOLEAN DEFAULT true,
  last_triggered_at TIMESTAMPTZ,
  trigger_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Fields:**
- `id`: Webhook ID
- `workflow_id`: Workflow to trigger
- `user_id`: Owner
- `path`: Unique URL path
- `secret`: Secret for HMAC signature validation
- `method`: HTTP method (POST, GET, etc.)
- `is_active`: Whether webhook is enabled
- `last_triggered_at`: Last trigger timestamp
- `trigger_count`: Total triggers

**Indexes:**
- `idx_webhooks_path` on `path` (unique)
- `idx_webhooks_workflow_id` on `workflow_id`

### `schedules`

Scheduled workflow executions (cron-like).

```sql
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cron_expression TEXT NOT NULL, -- e.g., "0 0 * * *" for daily
  timezone TEXT DEFAULT 'UTC',
  input_data JSONB, -- Default input data for scheduled runs
  is_active BOOLEAN DEFAULT true,
  next_run_at TIMESTAMPTZ,
  last_run_at TIMESTAMPTZ,
  run_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Fields:**
- `id`: Schedule ID
- `workflow_id`: Workflow to schedule
- `user_id`: Owner
- `name`: Schedule name
- `cron_expression`: Cron expression
- `timezone`: Timezone for schedule
- `input_data`: Default inputs for scheduled runs
- `is_active`: Whether schedule is enabled
- `next_run_at`: Next scheduled execution time
- `last_run_at`: Last execution time
- `run_count`: Total scheduled runs

**Indexes:**
- `idx_schedules_workflow_id` on `workflow_id`
- `idx_schedules_next_run_at` on `next_run_at` WHERE `is_active = true`
- `idx_schedules_user_id` on `user_id`

### `files`

File attachments and generated outputs.

```sql
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  execution_id UUID REFERENCES executions(id) ON DELETE SET NULL,
  filename TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  storage_path TEXT NOT NULL, -- Path in Supabase Storage or S3
  storage_provider TEXT DEFAULT 'supabase', -- 'supabase', 's3', etc.
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Fields:**
- `id`: File ID
- `user_id`: Owner
- `execution_id`: Execution that generated this file (if applicable)
- `filename`: Original filename
- `mime_type`: MIME type
- `size_bytes`: File size
- `storage_path`: Path in storage system
- `storage_provider`: Which storage system
- `metadata`: Additional file metadata

**Indexes:**
- `idx_files_user_id` on `user_id, created_at DESC`
- `idx_files_execution_id` on `execution_id`

## Optional: Multi-Tenancy Tables

If supporting teams/organizations:

### `organizations`

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `organization_members`

```sql
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'owner', 'admin', 'member', 'viewer'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);
```

Then add `organization_id` to `workflows` table if needed.

## Row Level Security (RLS) Policies

For Supabase, implement RLS policies:

```sql
-- Users can only see their own workflows
CREATE POLICY "Users can view own workflows"
  ON workflows FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only create workflows for themselves
CREATE POLICY "Users can create own workflows"
  ON workflows FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Similar policies for other tables...
```

## Query Examples

### Get user's workflows with execution stats

```sql
SELECT 
  w.*,
  COUNT(e.id) as total_executions,
  MAX(e.created_at) as last_execution
FROM workflows w
LEFT JOIN executions e ON e.workflow_id = w.id
WHERE w.user_id = $1
GROUP BY w.id
ORDER BY w.updated_at DESC;
```

### Find workflows by node type (using JSONB query)

```sql
SELECT *
FROM workflows
WHERE workflow_data->'nodes' @> '[{"type": "gmail"}]'::jsonb
AND user_id = $1;
```

### Get execution with logs

```sql
SELECT 
  e.*,
  json_agg(
    json_build_object(
      'level', l.level,
      'message', l.message,
      'timestamp', l.timestamp
    )
    ORDER BY l.timestamp
  ) as logs
FROM executions e
LEFT JOIN execution_logs l ON l.execution_id = e.id
WHERE e.id = $1
GROUP BY e.id;
```

## Migration Strategy

1. **Phase 1**: Core tables (users, workflows, executions)
2. **Phase 2**: Add logging and files
3. **Phase 3**: Add webhooks and schedules
4. **Phase 4**: Add integrations
5. **Phase 5**: Add multi-tenancy (if needed)

## Notes

- All timestamps use `TIMESTAMPTZ` for timezone-aware storage
- JSONB columns allow efficient querying and indexing
- Foreign keys use `ON DELETE CASCADE` or `ON DELETE SET NULL` appropriately
- Encryption for sensitive data (credentials) must be implemented at application level
- Consider adding soft deletes (`deleted_at` column) if needed
- Add `updated_at` triggers for automatic timestamp updates

