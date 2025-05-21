create table messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  question text not null,
  answer text not null,
  created_at timestamp with time zone default now()
);
