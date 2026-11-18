import fs from 'node:fs';
import path from 'node:path';
import {flagshipDocuments} from '@/lib/official-previews';

export const runtime='nodejs';

export async function GET(_request:Request,{params}:{params:Promise<{document:string}>}){
  const {document}=await params;
  if(document!=='checklist'&&document!=='odds') return new Response('Not found',{status:404});

  const root=process.env.ATLAS_DOCUMENT_ROOT;
  if(root){
    const file=path.join(root,document+'.pdf');
    if(fs.existsSync(file)){
      return new Response(fs.readFileSync(file),{headers:{'Content-Type':'application/pdf','Cache-Control':'private, max-age=3600'}});
    }
  }

  return Response.redirect(flagshipDocuments[document].url,302);
}
