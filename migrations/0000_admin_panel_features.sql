-- Safe additive migration for admin panel operations.
-- All added columns are nullable to preserve existing production data.

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS deleted_at timestamp,
  ADD COLUMN IF NOT EXISTS deletion_reason text,
  ADD COLUMN IF NOT EXISTS deleted_by text;

ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS deleted_at timestamp,
  ADD COLUMN IF NOT EXISTS deletion_reason text,
  ADD COLUMN IF NOT EXISTS deleted_by text;

ALTER TABLE contact_messages
  ADD COLUMN IF NOT EXISTS replied_at timestamp,
  ADD COLUMN IF NOT EXISTS reply_message text,
  ADD COLUMN IF NOT EXISTS replied_by text,
  ADD COLUMN IF NOT EXISTS is_resolved boolean,
  ADD COLUMN IF NOT EXISTS resolved_at timestamp;

ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS client_email text,
  ADD COLUMN IF NOT EXISTS client_name text;

CREATE TABLE IF NOT EXISTS invoice_line_items (
  id serial PRIMARY KEY,
  invoice_id integer REFERENCES invoices(id) ON DELETE CASCADE,
  description text,
  quantity decimal(10, 2),
  unit_price decimal(10, 2)
);
