create table public.atlas_users(id uuid primary key,username text unique not null,display_name text not null,password_hash text not null,role text not null check(role in ('member','admin')),public_credit integer not null default 0,created_at bigint not null);
create table public.atlas_sessions(token_hash text primary key,user_id uuid not null references public.atlas_users(id),expires_at bigint not null);
create table public.atlas_attempts(key text not null,at bigint not null);
create index atlas_attempts_key_at on public.atlas_attempts(key,at);
create table public.atlas_submissions(id uuid primary key,user_id uuid not null references public.atlas_users(id),card_id text not null,card_label text not null,original_card jsonb not null,kind text not null check(kind in ('report','image')),message text not null,field text,value text,side text,file_name text,file_sha256 text,source_url text not null default '',rights_confirmed integer not null default 0,status text not null default 'pending' check(status in ('pending','approved','rejected','reverted')),review_note text not null default '',reviewer_id uuid references public.atlas_users(id),created_at bigint not null,reviewed_at bigint);
create index atlas_submissions_user on public.atlas_submissions(user_id,status);
create index atlas_submissions_card on public.atlas_submissions(card_id,status);
create table public.atlas_corrections(submission_id uuid primary key references public.atlas_submissions(id),card_id text not null,field text not null check(field in ('number','player','team')),value text not null,previous_value text not null);
create table public.atlas_audit(id bigint generated always as identity primary key,actor_id uuid references public.atlas_users(id),submission_id uuid references public.atlas_submissions(id),action text not null,detail jsonb not null,at bigint not null);
alter table public.atlas_users enable row level security;
alter table public.atlas_sessions enable row level security;
alter table public.atlas_attempts enable row level security;
alter table public.atlas_submissions enable row level security;
alter table public.atlas_corrections enable row level security;
alter table public.atlas_audit enable row level security;
revoke all on public.atlas_users,public.atlas_sessions,public.atlas_attempts,public.atlas_submissions,public.atlas_corrections,public.atlas_audit from anon,authenticated;
grant all on public.atlas_users,public.atlas_sessions,public.atlas_attempts,public.atlas_submissions,public.atlas_corrections,public.atlas_audit to service_role;
grant usage,select on sequence public.atlas_audit_id_seq to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('atlas-uploads','atlas-uploads',false,10485760,array['image/webp']);
create function public.atlas_register(p_user jsonb) returns void language plpgsql security invoker set search_path='' as $$
begin
 perform pg_advisory_xact_lock(531004);
 if (select count(*) from public.atlas_users where role='member')>=50 then raise exception 'CAPACITY'; end if;
 insert into public.atlas_users select * from jsonb_populate_record(null::public.atlas_users,p_user);
end;$$;
create function public.atlas_throttle(p_key text,p_limit integer,p_period bigint,p_now bigint) returns boolean language plpgsql security invoker set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(p_key,0));
 delete from public.atlas_attempts where at<p_now-86400000;
 if (select count(*) from public.atlas_attempts where key=p_key and at>p_now-p_period)>=p_limit then return false; end if;
 insert into public.atlas_attempts values(p_key,p_now); return true;
end;$$;
create function public.atlas_submit(p_row jsonb) returns void language plpgsql security invoker set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(p_row->>'user_id',1));
 if (select count(*) from public.atlas_submissions where user_id=(p_row->>'user_id')::uuid and status='pending')>=5 then raise exception 'PENDING_LIMIT'; end if;
 insert into public.atlas_submissions select * from jsonb_populate_record(null::public.atlas_submissions,p_row);
end;$$;
create function public.atlas_review(p_id uuid,p_actor uuid,p_decision text,p_note text,p_field text,p_value text,p_now bigint) returns void language plpgsql security invoker set search_path='' as $$
declare s public.atlas_submissions;
begin
 if not exists(select 1 from public.atlas_users where id=p_actor and role='admin') then raise exception 'FORBIDDEN'; end if;
 select * into s from public.atlas_submissions where id=p_id for update;
 if not found then raise exception 'NOT_FOUND'; end if;
 if (p_decision='revert' and s.status<>'approved') or (p_decision in ('approve','reject') and s.status<>'pending') then raise exception 'ALREADY_REVIEWED'; end if;
 if p_decision not in ('approve','reject','revert') or length(p_note)<4 then raise exception 'INVALID_REVIEW'; end if;
 if p_decision='approve' and s.kind='report' then
  if p_field not in ('number','player','team','other') or coalesce(length(p_value),0)=0 then raise exception 'INVALID_REVIEW'; end if;
  if p_field<>'other' then insert into public.atlas_corrections values(s.id,s.card_id,p_field,p_value,coalesce(s.original_card->>p_field,'')); end if;
 end if;
 update public.atlas_submissions set status=case p_decision when 'approve' then 'approved' when 'reject' then 'rejected' else 'reverted' end,review_note=p_note,reviewer_id=p_actor,reviewed_at=p_now where id=p_id;
 insert into public.atlas_audit(actor_id,submission_id,action,detail,at) values(p_actor,p_id,p_decision,jsonb_build_object('note',p_note,'field',p_field,'value',p_value),p_now);
end;$$;
revoke all on function public.atlas_register(jsonb),public.atlas_throttle(text,integer,bigint,bigint),public.atlas_submit(jsonb),public.atlas_review(uuid,uuid,text,text,text,text,bigint) from public,anon,authenticated;
grant execute on function public.atlas_register(jsonb),public.atlas_throttle(text,integer,bigint,bigint),public.atlas_submit(jsonb),public.atlas_review(uuid,uuid,text,text,text,text,bigint) to service_role;
