import fs from 'node:fs';import path from 'node:path';
type Preview={card_id:string;label:string;version:string;source_url:string;image_url:string;status:string;file_imported:boolean};
let cache:Preview[]|undefined;
export function officialPreviews(id:string){if(!cache){const file=path.join(process.cwd(),'data/official-previews-v1.json');cache=fs.existsSync(file)?(JSON.parse(fs.readFileSync(file,'utf8')) as {records:Preview[]}).records:[]}return cache.filter(p=>p.card_id===id);}
