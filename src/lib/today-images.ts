import fs from 'node:fs';import path from 'node:path';
type Entry={id:string;card_id:string;side:string;file_name:string;sha256:string;source_title:string;source_page_url:string;source_image_url:string};
const files=['today-download-images-v1.json','gap-fill-images-v1.json'].map(name=>path.join(process.cwd(),'data',name));let cache:Map<string,Entry[]>|undefined;
export function todayImages(id:string):Entry[]{if(!cache){cache=new Map();for(const file of files){if(fs.existsSync(/*turbopackIgnore: true*/ file)){const data=JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ file,'utf8')) as {entries:Entry[]};for(const entry of data.entries){const list=cache.get(entry.card_id)||[];list.push(entry);cache.set(entry.card_id,list)}}}}return cache.get(id)||[];}
