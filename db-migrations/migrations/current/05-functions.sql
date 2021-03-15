-----------------------------------------------------------------------
-- note the use of aliases like update_answer.answer to avoid naming 
-- conflicts between function paramter names and column names
-----------------------------------------------------------------------


create or replace function current_user_id() returns integer as $$
  select nullif(current_setting('user.id', true), '')::integer;
$$ language sql stable;

-----------------------------------------------------
-- QUESTIONS
-----------------------------------------------------
create or replace function public.add_question(question text, details text)
returns public.question
as $$
  insert into public.question(author_id, question, details) values
  	(current_user_id(), question, details)	returning *;
$$ language sql volatile strict;

create or replace function public.follow_question(question_id bigint)
returns public.question_follower
as $$
  insert into public.question_follower(user_id, question_id) values
  	(current_user_id(), question_id)	returning *;
$$ language sql volatile strict;

create or replace function public.unfollow_question(question_id bigint)
returns public.question_follower
as $$
  delete from public.question_follower where 
    user_id = current_user_id() and question_id = question_id	returning *;
$$ language sql volatile strict;

-----------------------------------------------------
-- ANSWERS
-----------------------------------------------------
create or replace function public.add_answer(question_id bigint, answer JSON)
returns public.answer
as $$
  insert into public.answer(question_id, author_id, answer) values
  	(question_id, current_user_id(), answer)	returning *;
$$ language sql volatile strict;

create or replace function public.update_answer(answer_id bigint, answer JSON)
returns public.answer
as $$
  update public.answer set answer = update_answer.answer
    where id = answer_id	returning *;
$$ language sql volatile strict;


create or replace function public.delete_answer(answer_id bigint)
returns public.answer
as $$
  delete from public.answer where 
    author_id = current_user_id() and id = answer_id	returning *;
$$ language sql volatile strict;

