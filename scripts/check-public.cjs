const fs=require('fs'),{execFileSync}=require('child_process');
let names;try{names=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean)}catch{throw Error('Run this in a Git checkout after staging the public source files')}
if(!names.length)throw Error('No tracked files to inspect');const failures=[];
const forbidden=/^(data|qa|backups|local-maintainer|node_modules|\.next|\.vercel|\.firecrawl)\/|\.(sqlite(?:-wal|-shm)?|db|pdf|csv|zip|jpg|jpeg|png|webp)$/i;
const secretPatterns=[/gh[pousr]_[A-Za-z0-9]{20,}/,/sb_secret_[A-Za-z0-9_-]{20,}/,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/profile_setup_handoff=[A-Za-z0-9_-]+/];
// Construct private-machine pattern without embedding a machine path in source.
const drivePath=new RegExp('[A-Z]'+':'+String.raw`[\\/]`);
for(const name of names){if(name.startsWith('public/catalog-images/')&&/^[a-f0-9]{64}\.webp$/.test(name.split('/').pop()))continue;if(forbidden.test(name)||/(^|\/)\.env(?!\.example$)/.test(name)||/owner-initial-credentials\.txt$/.test(name)){failures.push(name+': private/binary file');continue}const bytes=fs.readFileSync(name);if(bytes.length>3*1024*1024){failures.push(name+': unexpectedly large');continue}const text=bytes.toString('utf8');if(secretPatterns.some(p=>p.test(text)))failures.push(name+': secret-like material');if(drivePath.test(text))failures.push(name+': machine-specific absolute drive path');}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log('PASS public source allowlist / secret-pattern / private-path checks:',names.length,'tracked files. This is a targeted check, not a full security audit.');
