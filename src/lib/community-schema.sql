PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,username TEXT NOT NULL UNIQUE COLLATE NOCASE,display_name TEXT NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN ('member','admin')),public_credit INTEGER NOT NULL DEFAULT 1,created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS attempts(key TEXT NOT NULL,at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS attempts_key ON attempts(key,at);
CREATE TABLE IF NOT EXISTS submissions(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),card_id TEXT NOT NULL,card_label TEXT NOT NULL,kind TEXT NOT NULL CHECK(kind IN ('report','image')),message TEXT NOT NULL,field TEXT,value TEXT,side TEXT CHECK(side IN ('front','back')),file_name TEXT,file_sha256 TEXT,source_url TEXT,rights_confirmed INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected','reverted')),review_note TEXT NOT NULL DEFAULT '',reviewer_id TEXT REFERENCES users(id),created_at INTEGER NOT NULL,reviewed_at INTEGER);
CREATE INDEX IF NOT EXISTS submissions_card ON submissions(card_id,status);
CREATE TABLE IF NOT EXISTS corrections(submission_id TEXT PRIMARY KEY REFERENCES submissions(id),card_id TEXT NOT NULL,field TEXT NOT NULL,value TEXT NOT NULL,previous_value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY,actor_id TEXT NOT NULL,submission_id TEXT NOT NULL,action TEXT NOT NULL,detail TEXT NOT NULL,at INTEGER NOT NULL);
