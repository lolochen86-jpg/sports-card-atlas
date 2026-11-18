import type {NextConfig} from 'next';
const config:NextConfig={serverExternalPackages:['better-sqlite3','sharp'],outputFileTracingIncludes:{'/*':['./data/demo/**/*','./src/lib/community-schema.sql']},poweredByHeader:false,devIndicators:false,turbopack:{root:process.cwd()}};
export default config;
