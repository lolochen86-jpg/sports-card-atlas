import {card} from '@/lib/catalog';
export const runtime='nodejs';
export async function GET(_req:Request,{params}:{params:Promise<{id:string}>}){const result=card((await params).id);return result?Response.json(result):Response.json({error:'找不到卡片'},{status:404});}
