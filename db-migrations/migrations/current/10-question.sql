-----------------------------------------------------
-- TRIGGER FUNCTIONS
-----------------------------------------------------



-----------------------------------------------------
-- TABLES
-----------------------------------------------------

drop table if exists public.question;
create table public.question (
  id bigserial primary key,
  author_id bigint not null references public.user(id) on delete cascade,
  question TEXT not null,
  details TEXT,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create index author_id_idx on question(author_id);
create trigger update_question before update on public.question for each row execute procedure updated_date();
comment on table public.question is 'Question';

drop table if exists public.question_follower;
create table public.question_follower (
  user_id bigint not null references public.user(id) on delete cascade,
  question_id bigint not null references public.question(id) on delete cascade,
  created_date timestamp with time zone default CURRENT_TIMESTAMP,
  constraint question_follower_pkey primary key (user_id, question_id)
);
comment on table public.question is 'Question Followers';

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

-----------------------------------------------------
-- GRANTS
-----------------------------------------------------  

GRANT ALL ON TABLE public.question TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.question_comment TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.question_follower TO postgres WITH GRANT OPTION;

-----------------------------------------------------
-- QUESTION MUTATIONS
-----------------------------------------------------

create or replace function public.question_add(question text, details text)
returns public.question
as $$
  insert into public.question(author_id, question, details) values
  	(current_user_id(), question, details)	returning *;
$$ language sql volatile strict;

create or replace function public.question_follow(question_id bigint)
returns public.question_follower
as $$
  insert into public.question_follower(user_id, question_id) values
  	(current_user_id(), question_id)	returning *;
$$ language sql volatile strict;

create or replace function public.question_unfollow(question_id bigint)
returns public.question_follower
as $$
  delete from public.question_follower where 
    user_id = current_user_id() and question_id = question_id	returning *;
$$ language sql volatile strict;


-----------------------------------------------------
-- COMMENT MUTATIONS
-----------------------------------------------------
create or replace function public.question_comment_add(question_id bigint, comment JSON, parent_id bigint default null)
returns public.question_comment
as $$
  insert into public.question_comment(question_id, parent_id, author_id, comment, upvotes, downvotes) values
  	(question_id, parent_id, current_user_id(), comment, 0, 0)	returning *;
$$ language sql volatile;

create or replace function public.question_comment_update(comment_id bigint, comment JSON)
returns public.question_comment
as $$
  update public.question_comment set comment = question_comment_update.comment
    where id = comment_id	returning *;
$$ language sql volatile strict;

create or replace function public.question_comment_delete(comment_id bigint)
returns public.question_comment
as $$
  delete from public.question_comment where id = comment_id	returning *;
$$ language sql volatile strict;

create or replace function public.question_comment_upvote_add(comment_id bigint)
returns public.question_comment
as $$
  insert into public.question_comment_upvote(user_id, comment_id) values (current_user_id(), comment_id);
  update public.question_comment set upvotes = (upvotes + 1) 
    where id = comment_id returning *;

$$ language sql volatile strict;

create or replace function public.question_comment_upvote_cancel(comment_id bigint)
returns public.question_comment
as $$
begin
  if not exists (select * from public.question_comment_upvote where user_id = current_user_id() and comment_id = question_comment_upvote_cancel.comment_id) then
    raise exception 'you have not upvoted this comment';
    return null;
  end if;
  delete from public.question_comment_upvote where user_id = current_user_id() and comment_id = question_comment_upvote_cancel.comment_id;
  update public.question_comment set upvotes = (upvotes - 1) 
    where id = comment_id returning *;
end;
$$ language plpgsql volatile strict;

create or replace function public.question_comment_downvote_add(comment_id bigint)
returns public.question_comment
as $$
  insert into public.question_comment_downvote(user_id, comment_id) values (current_user_id(), comment_id);
  update public.question_comment set downvotes = (downvotes +1)
    where id = comment_id returning *;
$$ language sql volatile strict;

create or replace function public.question_comment_downvote_cancel(comment_id bigint)
returns public.question_comment
as $$
begin
  if not exists (select * from public.question_comment_upvote where user_id = current_user_id() and comment_id = question_comment_downvote_cancel.comment_id) then
    raise exception 'you have not upvoted this comment';
    return null;
  end if;
  delete from public.question_comment_upvote where user_id = current_user_id() and comment_id = question_comment_downvote_cancel.comment_id;
  update public.question_comment set downvotes = (downvotes - 1)
    where id = comment_id returning *;
end;
$$ language plpgsql volatile strict;
