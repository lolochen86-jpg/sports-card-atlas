import type {NextConfig} from 'next';
const config:NextConfig={serverExternalPackages:['better-sqlite3','sharp'],poweredByHeader:false,devIndicators:false,turbopack:{root:process.cwd()}};
export default config;
