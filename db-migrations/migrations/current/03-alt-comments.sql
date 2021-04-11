

-- create type commentable as enum ('question', 'answer');

-- create or replace function increment_comment_relation_count()
-- returns trigger as $$
-- begin
--   if NEW.parent_id is not null then
--     -- only do this for child comments
--     update comment_relation set comment_count = comment_count +1 where
--       id = NEW.thread_id;
--   end if;
--   return NEW;
-- end;
-- $$
-- LANGUAGE plpgsql VOLATILE;

-- create or replace function decrement_comment_relation_count()
-- returns trigger as $$
-- begin
--   update comment_relation set comment_count = comment_count -1 where
--     id = OLD.thread_id;
-- end;
-- $$
-- LANGUAGE plpgsql VOLATILE;

-- create or replace function update_related_comment_count()
-- returns trigger as $$
-- begin
--   if NEW.relation_type = 'question' then
--       update question set comment_count = comment_count + (NEW.comment_count - OLD.comment_count) where question_id = NEW.relation_id;
--   elsif NEW.relation_type = 'answer' then
--       update answer set comment_count = comment_count + (NEW.comment_count - OLD.comment_count) where answer_id = NEW.relation_id;
--   end if;
--   return NEW;
-- end;
-- $$
-- LANGUAGE plpgsql VOLATILE;



-- drop table if exists public.comment_relation;
-- create table public.comment_relation (
--   id bigserial primary key,
--   relation_id bigint not null,
--   relation_type text not null,
--   --comment_id bigint not null references public.comment(id) on delete cascade,
--   comment_count int default 1
-- );
-- alter table public.comment_relation add constraint unique_comment_relation UNIQUE (relation_id, relation_type);
-- comment on column public.comment_relation.relation_type is E'@isPolymorphic\n@polymorphicTo Answer\n';

-- create index answer_comment_relation_relation_id_idx on comment_relation(relation_id, relation_type);
--create index answer_comment_comment_id_idx on comment_relation(comment_id);
--create trigger tr_comment_relation_count after delete on public.comment_relation for each row execute procedure update_comment_relation_count();


-- create or replace function increment_comment_count()
-- returns trigger as $$
-- begin
--   if NEW.relation_type = 'question' then
--       update question set comment_count = comment_count + 1 where id = NEW.relation_id;
--   elsif NEW.relation_type = 'answer' then
--       update answer set comment_count = comment_count + 1 where id = NEW.relation_id;
--   end if;
--   return NEW;
-- end;
-- $$
-- LANGUAGE plpgsql VOLATILE;

-- create or replace function decrement_comment_count()
-- returns trigger as $$
-- begin
--   if OLD.relation_type = 'question' then
--       update question set comment_count = comment_count - 1 where id = OLD.relation_id;
--   elsif OLD.relation_type = 'answer' then
--       update answer set comment_count = comment_count - 1 where id = OLD.relation_id;
--   end if;
--   return OLD;
-- end;
-- $$
-- LANGUAGE plpgsql VOLATILE;



-- drop table if exists public.comment;
-- create table public.comment (
--   id bigserial primary key,
--   relation_id bigint not null,
--   relation_type text not null,  
--   --thread_id bigint references public.comment_relation(id) on delete cascade,
--   parent_id bigint references public.comment(id) on delete cascade,
--   author_id bigint not null references public.user(id) on delete cascade,
--   comment JSON not null,
--   upvotes int not null default 0,
--   downvotes int not null default 0,
--   updated_date timestamp with time zone default CURRENT_TIMESTAMP,
--   created_date timestamp with time zone default CURRENT_TIMESTAMP
-- );
-- create trigger update_comment before update on public.comment for each row execute procedure updated_date();
-- create trigger tr_increment_comment_count after insert on public.comment for each row execute procedure increment_comment_count();
-- create trigger tr_decrement_comment_count after delete on public.comment for each row execute procedure decrement_comment_count();
-- create index idx_comment_relation on comment(relation_id, relation_type);
-- --alter table public.comment add constraint unique_comment_relation UNIQUE (relation_id, relation_type);
-- --create index idx_comment_thread_id on public.comment(thread_id);
-- --comment on column public.comment.relation_type is E'@isPolymorphic\n@polymorphicTo Question\n@polymorphicTo Answer';
-- comment on table public.comment is 'Comment';



-- drop table if exists public.comment_upvote;
-- create table public.comment_upvote (
--   user_id bigint not null references public.user(id) on delete cascade,
--   comment_id bigint not null references public.comment(id) on delete cascade,
--   created_date timestamp with time zone default CURRENT_TIMESTAMP,
--   constraint comment_upvote_pkey primary key (user_id, comment_id)
-- );
-- comment on table public.comment_upvote is
--   'Commment Upvotes';

-- drop table if exists public.comment_downvote;
-- create table public.comment_downvote (
--   user_id bigint not null references public.user(id) on delete cascade,
--   comment_id bigint not null references public.comment(id) on delete cascade,
--   created_date timestamp with time zone default CURRENT_TIMESTAMP,
--   constraint comment_downvote_pkey primary key (user_id, comment_id)
-- );
-- comment on table public.comment_upvote is
--   'Commment Downvotes'; 





-- drop table if exists public.answer_comment;
-- create table public.answer_comment (
--   answer_id bigint not null references public.answer(id) on delete cascade,
--   comment_id bigint not null references public.comment(id) on delete cascade,
--   comment_count int default 1
-- );
-- create index answer_comment_answer_id_idx on answer_thread(answer_id);
-- create index answer_comment_comment_id_idx on answer_comment(comment_id);
-- create trigger tr_answer_comment_count after delete on public.answer_comment for each row execute procedure update_answer_comment_count();
-- comment on table public.answer_comment is
--   'Answer Comments';

