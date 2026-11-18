import sources from './flagship-sources.json';

export function officialPreviews(id:string){
  return sources.previews.filter(preview=>preview.card_id===id);
}

export const flagshipDocuments=sources.documents;
