import {AsyncLocalStorage} from 'node:async_hooks';
import sharp from 'sharp';
import {apiError,HttpError,readJson,sameOrigin} from './community-auth';
import {card} from './catalog';
export const cloudEnabled=()=>!!process.env.ATLAS_CLOUD_GATEWAY;
type Overlay={rows:{id:string;card_id:string;kind:string;side:string;source_url:string}[];corrections:{submission_id:string;card_id:string;field:string;value:string}[]};
export const cloudContext=new AsyncLocalStorage<Overlay>();
const publicActions=new Set(['me','supporters','mine','admin','register','login','logout','preferences','password','submit','review','image']);
export async function gateway(action:string,req?:Request,body?:BodyInit,query?:URLSearchParams){const url=new URL(process.env.ATLAS_CLOUD_GATEWAY!);url.searchParams.set('action',action);query?.forEach((v,k)=>{if(k!=='action')url.searchParams.set(k,v)});const headers=new Headers({'x-atlas-key':process.env.ATLAS_CLOUD_KEY!});if(req?.headers.get('cookie'))headers.set('cookie',req.headers.get('cookie')!);if(body&&typeof body==='string')headers.set('content-type','application/json');return fetch(url,{method:body?'POST':'GET',headers,body,cache:'no-store',signal:AbortSignal.timeout(45000)});}
export async function withCloud<T>(fn:()=>T){if(!cloudEnabled())return fn();const r=await gateway('overlay');if(!r.ok)throw new Error('Community overlay unavailable');return cloudContext.run(await r.json() as Overlay,fn);}
export async function cloudRoute(action:string,req:Request){try{
 if(!publicActions.has(action)||action==='image')throw new HttpError(404,'找不到此入口');
 let body:BodyInit|undefined;
 if(req.method==='POST'){
  sameOrigin(req);
  if(action==='submit'){
   // Vercel's request payload limit is 4.5 MB; give a usable limit below it.
   const max=4*1024*1024;if(Number(req.headers.get('content-length'))>max)throw new HttpError(413,'線上投稿總量上限為 4 MB，請縮小圖片');
   const reader=req.body?.getReader();if(!reader)throw new HttpError(400,'缺少投稿內容');let n=0;const chunks:Uint8Array[]=[];while(true){const {done,value}=await reader.read();if(done)break;n+=value.length;if(n>max){await reader.cancel();throw new HttpError(413,'線上投稿總量上限為 4 MB')}chunks.push(value);}
   const form=await new Response(Buffer.concat(chunks),{headers:{'Content-Type':req.headers.get('content-type')||''}}).formData();
   const target=await withCloud(()=>card(String(form.get('card_id')||'')));if(!target)throw new HttpError(400,'請選擇有效卡位');
   form.set('_card',JSON.stringify({id:target.id,number:target.number,player:target.player,team:target.team,label:target.product?.name+' / '+target.set_name+' / #'+target.number+' '+target.player}));
   if(form.get('kind')==='image'){
    const file=form.get('file');if(!(file instanceof File)||file.size<1||file.size>max-16384)throw new HttpError(400,'請上傳 4 MB 內的 JPG、PNG 或 WebP');
    try{const p=sharp(Buffer.from(await file.arrayBuffer()),{limitInputPixels:24000000,animated:false}),meta=await p.metadata();if(!['jpeg','png','webp'].includes(meta.format||'')||(meta.pages||1)>1)throw Error();const image=await p.rotate().resize({width:1800,height:2700,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();form.set('file',new File([new Uint8Array(image)],'upload.webp',{type:'image/webp'}));}catch{throw new HttpError(400,'圖片無法解碼，僅接受單張 JPG、PNG、WebP')}
   }
   body=form;
  }else body=JSON.stringify(await readJson(req));
 }
 const r=await gateway(action,req,body,new URL(req.url).searchParams);return new Response(r.body,{status:r.status,headers:r.headers});
}catch(e){return apiError(e)}}
