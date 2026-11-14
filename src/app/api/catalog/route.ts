import {products} from '@/lib/catalog';
export const runtime='nodejs';
export async function GET(){return Response.json({products:products(),source:'既有目錄＋官方新品資料；逐卡盒型關聯待核對',publicImagesVerified:0},{headers:{'Cache-Control':'no-store'}});}
