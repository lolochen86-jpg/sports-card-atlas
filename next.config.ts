import type {NextConfig} from 'next';
const config:NextConfig={serverExternalPackages:['better-sqlite3','sharp'],outputFileTracingIncludes:{'/*':['./data/demo/**/*','./public/catalog-images/**/*','./src/lib/community-schema.sql']},poweredByHeader:false,devIndicators:false,turbopack:{root:process.cwd()}};
export default config;
