create type commentable as enum ('question', 'answer');

-----------------------------------------------------
-- TRIGGER FUNCTIONS
-----------------------------------------------------



-----------------------------------------------------
-- TABLES
-----------------------------------------------------
drop table if exists public.comment_tree;
create table public.comment_tree (
  id bigserial primary key,
  entity_type commentable not null,
  comment_count int default 0,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create trigger update_comment_tree before update on public.comment_tree for each row execute procedure updated_date();
comment on table public.comment_tree is
  'Comment Tree';

drop table if exists public.comment;
create table public.comment (
  id bigserial primary key,
  tree_id bigint references public.comment_tree(id) on delete cascade,
  parent_id bigint references public.comment(id) on delete cascade,
  author_id bigint not null references public.user(id) on delete cascade,
  comment JSON not null,
  upvotes int not null default 0,
  downvotes int not null default 0,
  updated_date timestamp with time zone default CURRENT_TIMESTAMP,
  created_date timestamp with time zone default CURRENT_TIMESTAMP
);
create trigger update_comment before update on public.comment for each row execute procedure updated_date();
comment on table public.comment is
  'Comment';

drop table if exists public.comment_upvote;
create table public.comment_upvote (
  user_id bigint not null references public.user(id) on delete cascade,
  comment_id bigint not null references public.comment(id) on delete cascade,
  created_date timestamp with time zone default CURRENT_TIMESTAMP,
  constraint comment_upvote_pkey primary key (user_id, comment_id)
);
comment on table public.comment_upvote is
  'Commment Upvotes';

drop table if exists public.comment_downvote;
create table public.comment_downvote (
  user_id bigint not null references public.user(id) on delete cascade,
  comment_id bigint not null references public.comment(id) on delete cascade,
  created_date timestamp with time zone default CURRENT_TIMESTAMP,
  constraint comment_downvote_pkey primary key (user_id, comment_id)
);
comment on table public.comment_upvote is
  'Commment Downvotes';  

-----------------------------------------------------
-- GRANTS
-----------------------------------------------------  
GRANT ALL ON TABLE public.comment_tree TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE public.comment TO postgres WITH GRANT OPTION;

-----------------------------------------------------
-- COMMENT MUTATIONS
-----------------------------------------------------
create or replace function public.comment_add(tree_id bigint, parent_id bigint, comment JSON)
returns public.comment
as $$
  insert into public.comment(tree_id, parent_id, author_id, comment, upvotes, downvotes) values
  	(tree_id, parent_id, current_user_id(), comment, 0, 0)	returning *;
$$ language sql volatile;

create or replace function public.comment_update(comment_id bigint, comment JSON)
returns public.comment
as $$
  update public.comment set comment = comment_update.comment
    where id = comment_id	returning *;
$$ language sql volatile strict;

create or replace function public.comment_delete(comment_id bigint)
returns public.comment
as $$
  delete from public.comment where id = comment_id	returning *;
$$ language sql volatile strict;

create or replace function public.comment_upvote_add(comment_id bigint)
returns public.comment
as $$
  insert into public.comment_upvote(user_id, comment_id) values (current_user_id(), comment_id);
  update public.comment set upvotes = (upvotes + 1) 
    where id = comment_id returning *;

$$ language sql volatile strict;

create or replace function public.comment_upvote_cancel(comment_id bigint)
returns public.comment
as $$
declare _comment public.comment;
begin
  if not exists (select * from public.comment_upvote where user_id = current_user_id() and public.comment_upvote.comment_id = comment_upvote_cancel.comment_id) then
    raise exception 'you have not upvoted this comment';
    return null;
  end if;
  delete from public.comment_upvote where user_id = current_user_id() and public.comment_upvote.comment_id = comment_upvote_cancel.comment_id;
  update public.comment set upvotes = (upvotes - 1) 
    where id = comment_id;
  select * from public.comment where id = comment_id into _comment;
  return _comment; --TODO: do we need to return anything here?    
end;
$$ language plpgsql volatile strict;

create or replace function public.comment_downvote_add(comment_id bigint)
returns public.comment
as $$
  insert into public.comment_downvote(user_id, comment_id) values (current_user_id(), comment_id);
  update public.comment set downvotes = (downvotes +1)
    where id = comment_id returning *;
$$ language sql volatile strict;

create or replace function public.comment_downvote_cancel(comment_id bigint)
returns public.comment
as $$
declare _comment public.comment;
begin
  if not exists (select * from public.comment_downvote where user_id = current_user_id() and public.comment_downvote.comment_id = comment_downvote_cancel.comment_id) then
    raise exception 'you have not upvoted this comment';
    return null;
  end if;
  delete from public.comment_downvote where user_id = current_user_id() and public.comment_downvote.comment_id = comment_downvote_cancel.comment_id;
  update public.comment set downvotes = (downvotes - 1)
    where id = comment_id;
  select * from public.comment where id = comment_id into _comment;
  return _comment; --TODO: do we need to return anything here?
end;
$$ language plpgsql volatile strict;
