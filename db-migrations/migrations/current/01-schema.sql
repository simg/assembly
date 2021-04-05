drop schema if exists public cascade;
create schema public;
alter schema public owner to postgres;

create or replace function updated_date()
returns trigger as $$
begin 
  NEW.updated_date = CURRENT_TIMESTAMP;
  return NEW;
end;
$$
LANGUAGE plpgsql VOLATILE;

drop table if exists public.user;
create table public.user (
  id bigserial primary key,
  email text not null,
  username text not null,  
  first_name text not null,
  last_name text not null,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create trigger update_user before update on public.user for each row execute procedure updated_date();

drop table if exists public.question;
create table public.question (
  id bigserial primary key,
  author_id bigint not null references public.user(id) on delete cascade,
  question TEXT not null,
  details TEXT,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create trigger update_question before update on public.question for each row execute procedure updated_date();
comment on table public.question is 'Question';
create index author_id_idx on question(author_id);

drop table if exists public.question_follower;
create table public.question_follower (
  user_id bigint not null references public.user(id) on delete cascade,
  question_id bigint not null references public.question(id) on delete cascade,
  created_date timestamp with time zone default CURRENT_TIMESTAMP,
  constraint question_follower_pkey primary key (user_id, question_id)
);
comment on table public.question is
  'Question Followers';

drop table if exists public.answer;
create table public.answer (
  id bigserial primary key,
  answer JSON not null,
  question_id bigint not null references public.question(id) on delete cascade,
  author_id bigint not null references public.user(id) on delete cascade,
  comment_count int default 0,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create trigger update_answer before update on public.answer for each row execute procedure updated_date();
comment on table public.answer is
  'Answer';

drop table if exists public.question_comment;
create table public.question_comment (
  id bigserial primary key,
  question_id bigint references public.question(id) on delete cascade,
  parent_id bigint references public.question_comment(id) on delete cascade,
  author_id bigint not null references public.user(id) on delete cascade,
  comment JSON not null,
  upvotes int not null default 0,
  downvotes int not null default 0,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create trigger update_comment before update on public.question_comment for each row execute procedure updated_date();
comment on table public.question_comment is
  'Question Comment';

drop table if exists public.question_comment_upvote;
create table public.question_comment_upvote (
  user_id bigint not null references public.user(id) on delete cascade,
  comment_id bigint not null references public.question_comment(id) on delete cascade,
  created_date timestamp with time zone default CURRENT_TIMESTAMP,
  constraint question_comment_upvote_pkey primary key (user_id, comment_id)
);
comment on table public.question_comment_upvote is
  'Question Commment Upvotes';

drop table if exists public.question_comment_downvote;
create table public.question_comment_downvote (
  user_id bigint not null references public.user(id) on delete cascade,
  comment_id bigint not null references public.question_comment(id) on delete cascade,
  created_date timestamp with time zone default CURRENT_TIMESTAMP,
  constraint question_comment_downvote_pkey primary key (user_id, comment_id)
);
comment on table public.question_comment_upvote is
  'Question Commment Downvotes'; 



-- drop table if exists public.answer_comment;
-- create table public.answer_comment (
--   id bigserial primary key,
--   comment TEXT not null,
--   answer_id bigint references public.answer(id) on delete cascade,
--   parent_id bigint references public.answer_comment(id) on delete cascade,
--   author_id bigint not null references public.user(id) on delete cascade,
--   updated_date timestamp with time zone default CURRENT_TIMESTAMP,
--   created_date timestamp with time zone default CURRENT_TIMESTAMP
-- );
-- create trigger update_comment before update on public.answer_comment for each row execute procedure updated_date();
-- comment on table public.answer_comment is
--   'Answer Comment';    


drop role if exists admin;
create role admin;
drop role if exists moderator;
create role moderator;
drop role if exists authenticated;
create role authenticated;
drop role if exists anonymous;
create role anonymous;

GRANT ALL ON TABLE public.answer TO postgres WITH GRANT OPTION;
-- GRANT ALL ON TABLE public.answer_comment TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.question TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.question_comment TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.question_follower TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.user TO postgres WITH GRANT OPTION;  


-- drop table if exists public.human;
-- create table public.human (
--   id bigserial primary key,
--   title TEXT,
--   first_name TEXT,
--   last_name TEXT,
--   updated_date timestamp with time zone default CURRENT_TIMESTAMP,
--   created_date timestamp with time zone default CURRENT_TIMESTAMP,
--   constraint human_pkey PRIMARY KEY (id)
-- );

-- comment on table public.human is
--   'Person known to the database';

-- create trigger update_human before update on public.human for each row execute procedure updated_date();



-- drop table if exists public.comment;
-- create table public.comment (
--   id bigserial primary key,
--   comment TEXT not null,
--   parent_id bigint references public.comment(id) on delete cascade,
--   author_id bigint not null references public.user(id) on delete cascade,
--   updated_date timestamp with time zone default CURRENT_TIMESTAMP,
--   created_date timestamp with time zone default CURRENT_TIMESTAMP
-- );
-- create trigger update_comment before update on public.comment for each row execute procedure updated_date();
-- comment on table public.comment is
--   'Comment';  

-- drop table if exists public.question_comment;
-- create table public.question_comment (
--   question_id bigint not null references public.question(id) on delete cascade,
--   comment_id bigint not null references public.comment(id) on delete cascade,
--   constraint question_comment_pkey primary key (question_id, comment_id)
-- );
-- comment on table public.question_comment is
--   'Question Comments';  


-- drop table if exists public.answer_comment;
-- create table public.answer_comment (
--   answer_id bigint not null references public.answer(id) on delete cascade,
--   comment_id bigint not null references public.comment(id) on delete cascade,
--   constraint answer_comment_pkey primary key (answer_id, comment_id)
-- );
-- comment on table public.answer_comment is
--   'Answer Comments'; 

-- drop table if exists public.comment_reply;
-- create table public.comment_reply (
--   comment_id bigint not null  references public.comment(id) on delete cascade,
--   comment_reply_id bigint not null references public.comment(id) on delete cascade,
--   constraint comment_reply_pkey primary key (comment_reply_id, comment_id)
-- );
-- comment on table public.comment_reply is
--   'Comment Replies';  
-- comment on constraint "comment_reply_comment_reply_id_fkey" ON "public"."comment_reply" IS E'@fieldName commentChildren';  
