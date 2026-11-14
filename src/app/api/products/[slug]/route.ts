import {wall} from '@/lib/catalog';
export const runtime='nodejs';
export async function GET(req:Request,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;const result=wall(slug,new URL(req.url).searchParams);return result?Response.json(result):Response.json({error:'找不到系列'},{status:404});}
