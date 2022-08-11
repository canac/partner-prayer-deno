# partner-prayer-deno

Partner Prayer web app written in Deno using the fresh framework.

## Setup

Create a new CockroachDB instance. To create the needed tables run:

```sql
CREATE TABLE partner (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  completed bool NOT NULL DEFAULT FALSE
);
```
