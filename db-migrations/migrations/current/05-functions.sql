-----------------------------------------------------------------------
-- note the use of aliases like update_answer.answer to avoid naming 
-- conflicts between function paramter names and column names
-----------------------------------------------------------------------
create or replace function current_user_id() returns integer as $$
  select nullif(current_setting('user.id', true), '')::integer;
$$ language sql stable;

