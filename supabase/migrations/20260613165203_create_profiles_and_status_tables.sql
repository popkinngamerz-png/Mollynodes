/*
# Create profiles and status monitoring tables

1. New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique, not null)
  - `username` (text, unique, not null)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

- `status_nodes`
  - `id` (uuid, primary key)
  - `name` (text, not null) - e.g. "IN-Mumbai-01"
  - `location` (text, not null) - e.g. "Mumbai, India"
  - `type` (text, not null) - e.g. "minecraft", "vps"
  - `cpu_type` (text) - e.g. "Ryzen 9 7900X", "Intel Xeon E5-2699 V4"
  - `status` (text, default 'operational') - operational, degraded, down
  - `uptime_pct` (numeric, default 99.99)
  - `last_checked` (timestamptz)

- `status_incidents`
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `status` (text, default 'investigating') - investigating, identified, monitoring, resolved
  - `affected_nodes` (text[]) - array of node names
  - `started_at` (timestamptz)
  - `resolved_at` (timestamptz)
  - `updates` (jsonb, default '[]'::jsonb) - array of {time, message, status}

- `status_metrics`
  - `id` (uuid, primary key)
  - `node_id` (uuid, references status_nodes)
  - `timestamp` (timestamptz, default now())
  - `cpu_usage` (numeric) - percentage
  - `ram_usage` (numeric) - percentage
  - `disk_usage` (numeric) - percentage
  - `network_in_mbps` (numeric)
  - `network_out_mbps` (numeric)
  - `active_servers` (integer)

2. Security
- Enable RLS on all tables.
- profiles: owner-scoped CRUD (auth.uid() = id)
- status_nodes: read-only for authenticated users, writes via service role only
- status_incidents: read-only for authenticated users
- status_metrics: read-only for authenticated users
*/

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Status nodes
CREATE TABLE IF NOT EXISTS status_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  cpu_type text,
  status text NOT NULL DEFAULT 'operational',
  uptime_pct numeric NOT NULL DEFAULT 99.99,
  last_checked timestamptz DEFAULT now()
);

ALTER TABLE status_nodes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_read_status_nodes" ON status_nodes;
CREATE POLICY "authenticated_read_status_nodes" ON status_nodes FOR SELECT
  TO authenticated USING (true);

-- Status incidents
CREATE TABLE IF NOT EXISTS status_incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  status text NOT NULL DEFAULT 'investigating',
  affected_nodes text[] DEFAULT '{}',
  started_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  updates jsonb DEFAULT '[]'::jsonb
);

ALTER TABLE status_incidents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_read_status_incidents" ON status_incidents;
CREATE POLICY "authenticated_read_status_incidents" ON status_incidents FOR SELECT
  TO authenticated USING (true);

-- Status metrics
CREATE TABLE IF NOT EXISTS status_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id uuid REFERENCES status_nodes(id) ON DELETE CASCADE,
  timestamp timestamptz DEFAULT now(),
  cpu_usage numeric,
  ram_usage numeric,
  disk_usage numeric,
  network_in_mbps numeric,
  network_out_mbps numeric,
  active_servers integer
);

ALTER TABLE status_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_read_status_metrics" ON status_metrics;
CREATE POLICY "authenticated_read_status_metrics" ON status_metrics FOR SELECT
  TO authenticated USING (true);

-- Seed status nodes with MetroX infrastructure data
INSERT INTO status_nodes (name, location, type, cpu_type, status, uptime_pct) VALUES
  ('IN-Mumbai-01', 'Mumbai, India', 'minecraft', 'Intel Xeon E5-2699 V4', 'operational', 99.99),
  ('IN-Mumbai-02', 'Mumbai, India', 'minecraft', 'AMD EPYC 9000', 'operational', 99.99),
  ('IN-Mumbai-03', 'Mumbai, India', 'minecraft', 'AMD Ryzen 9 7900X', 'operational', 99.99),
  ('IN-Noida-01', 'Noida, India', 'vps', 'Intel Xeon E5-2699 V4', 'operational', 99.99),
  ('IN-Mumbai-04', 'Mumbai, India', 'vps', 'AMD Ryzen 9 7900X', 'operational', 99.99)
ON CONFLICT DO NOTHING;

-- Seed some recent metrics data for each node (past 24 hours at 1-hour intervals)
DO $$
DECLARE
  node_rec RECORD;
  ts timestamptz;
  i integer;
BEGIN
  FOR node_rec IN SELECT id FROM status_nodes LOOP
    FOR i IN 0..23 LOOP
      ts := now() - (i || ' hours')::interval;
      INSERT INTO status_metrics (node_id, timestamp, cpu_usage, ram_usage, disk_usage, network_in_mbps, network_out_mbps, active_servers)
      VALUES (
        node_rec.id,
        ts,
        15 + random() * 40,
        30 + random() * 35,
        20 + random() * 30,
        50 + random() * 200,
        80 + random() * 300,
        floor(20 + random() * 80)::integer
      );
    END LOOP;
  END LOOP;
END $$;
