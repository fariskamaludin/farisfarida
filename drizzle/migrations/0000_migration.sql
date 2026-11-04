CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  attendance text NOT NULL CHECK (attendance IN ('hadir','tidak','ragu')),
  guests int NOT NULL DEFAULT 1 CHECK (guests BETWEEN 1 AND 5),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 500),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.rsvps TO anon, authenticated;
GRANT ALL ON public.rsvps TO service_role;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read wishes" ON public.rsvps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can submit rsvp" ON public.rsvps FOR INSERT TO anon, authenticated WITH CHECK (true);