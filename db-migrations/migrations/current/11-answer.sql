-----------------------------------------------------
-- TRIGGER FUNCTIONS
-----------------------------------------------------

create or replace function increment_answer_comment_count()
returns trigger as $$
begin
  update public.answer set comment_count = comment_count +1 where id = NEW.answer_id;
  return NEW;
end;
$$
LANGUAGE plpgsql VOLATILE;

create or replace function decrement_answer_comment_count()
returns trigger as $$
begin
  update public.answer set comment_count = comment_count -1 where id = OLD.thread_id;
end;
$$
LANGUAGE plpgsql VOLATILE;

-----------------------------------------------------
-- TABLES
-----------------------------------------------------

drop table if exists public.answer;
create table public.answer (
  id bigserial primary key,
  answer JSON not null,
  question_id bigint not null references public.question(id) on delete cascade,
  author_id bigint not null references public.user(id) on delete cascade,
  comment_count int default 0,
  upvotes int default 0,
  downvotes int default 0,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create trigger update_answer before update on public.answer for each row execute procedure updated_date();
comment on table public.answer is 'Answer';

drop table if exists public.answer_comment;
create table public.answer_comment (
  id bigserial primary key,
  answer_id bigint references public.answer(id) on delete cascade,
  parent_id bigint references public.answer_comment(id) on delete cascade,
  author_id bigint not null references public.user(id) on delete cascade,
  comment JSON not null,
  upvotes int not null default 0,
  downvotes int not null default 0,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create index idx_comment_answer_id on public.answer_comment(answer_id);
comment on table public.answer_comment is 'Answer Comment';

create trigger update_answer_comment before update on public.answer_comment for each row execute procedure updated_date();
create trigger tr_increment_answer_comment_count after insert on public.answer_comment for each row execute procedure increment_answer_comment_count();
create trigger tr_decrement_answer_comment_count after delete on public.answer_comment for each row execute procedure decrement_answer_comment_count();

drop table if exists public.answer_comment_upvote;
create table public.answer_comment_upvote (
  user_id bigint not null references public.user(id) on delete cascade,
  comment_id bigint not null references public.answer_comment(id) on delete cascade,
  created_date timestamp with time zone default CURRENT_TIMESTAMP,
  constraint answer_comment_upvote_pkey primary key (user_id, comment_id)
);
comment on table public.answer_comment_upvote is 'Answer Commment Upvotes';

drop table if exists public.answer_comment_downvote;
create table public.answer_comment_downvote (
  user_id bigint not null references public.user(id) on delete cascade,
  comment_id bigint not null references public.answer_comment(id) on delete cascade,
  created_date timestamp with time zone default CURRENT_TIMESTAMP,
  constraint answer_comment_downvote_pkey primary key (user_id, comment_id)
);
comment on table public.answer_comment_downvote is 'Answer Commment Downvotes'; 

-----------------------------------------------------
-- GRANTS
-----------------------------------------------------

GRANT ALL ON TABLE public.answer TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.answer_comment TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.answer_comment_upvote TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.answer_comment_downvote TO postgres WITH GRANT OPTION;

-----------------------------------------------------
-- ANSWER MUTATIONS
-----------------------------------------------------
create or replace function public.answer_add(question_id bigint, answer JSON)
returns public.answer
as $$
  insert into public.answer(question_id, author_id, answer) values
  	(question_id, current_user_id(), answer)	returning *;
$$ language sql volatile strict;

create or replace function public.answer_update(answer_id bigint, answer JSON)
returns public.answer
as $$
  update public.answer set answer = answer_update.answer
    where id = answer_id	returning *;
$$ language sql volatile strict;

create or replace function public.answer_delete(answer_id bigint)
returns public.answer
as $$
  delete from public.answer where 
    author_id = current_user_id() and id = answer_id	returning *;
$$ language sql volatile strict;


-----------------------------------------------------
-- COMMENT MUTATIONS
-----------------------------------------------------
create or replace function public.answer_comment_add(answer_id bigint, comment JSON, parent_id bigint default null)
returns public.answer_comment
as $$
  insert into public.answer_comment(answer_id, parent_id, author_id, comment, upvotes, downvotes) values
  	(answer_id, parent_id, current_user_id(), comment, 0, 0)	returning *;
$$ language sql volatile;

create or replace function public.answer_comment_update(comment_id bigint, comment JSON)
returns public.answer_comment
as $$
  update public.answer_comment set comment = answer_comment_update.comment
    where id = comment_id	returning *;
$$ language sql volatile strict;

create or replace function public.answer_comment_delete(comment_id bigint)
returns public.answer_comment
as $$
  delete from public.answer_comment where id = comment_id	returning *;
$$ language sql volatile strict;

-----------------------------------------------------
-- COMMENT UPVOTE / DOWNVOTE MUTATIONS
-----------------------------------------------------

create or replace function public.answer_comment_upvote_add(comment_id bigint)
returns public.answer_comment
as $$
  insert into public.answer_comment_upvote(user_id, comment_id) values (current_user_id(), comment_id);
  update public.answer_comment set upvotes = (upvotes + 1) where id = comment_id returning *;
$$ language sql volatile strict;

create or replace function public.answer_comment_upvote_cancel(comment_id bigint)
returns public.answer_comment
as $$
begin
  if not exists (select * from public.fn_answer_comment_upvote where user_id = current_user_id() and comment_id = comment_id) then
    raise exception 'you have not upvoted this comment';
    return null;
  end if;
  delete from public.answer_comment_upvote where user_id = current_user_id() and comment_id = comment_id;
  update public.answer_comment set upvotes = (upvotes - 1) where id = comment_id returning *;
end;
$$ language plpgsql volatile strict;

create or replace function public.answer_comment_downvote_add(comment_id bigint)
returns public.answer_comment
as $$
  insert into public.answer_comment_downvote(user_id, comment_id) values (current_user_id(), comment_id);
  update public.answer_comment set downvotes = (downvotes +1) where id = comment_id returning *;
$$ language sql volatile strict;

create or replace function public.answer_comment_downvote_cancel(comment_id bigint)
returns public.answer_comment
as $$
begin
  if not exists (select * from public.answer_comment_upvote where user_id = current_user_id() and comment_id = comment_id) then
    raise exception 'you have not upvoted this comment';
    return null;
  end if;
  delete from public.answer_comment_downvote where user_id = current_user_id() and comment_id = comment_id;
  update public.answer_comment set downvotes = (downvotes - 1) where id = comment_id returning *;
end;
$$ language plpgsql volatile strict;