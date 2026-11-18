import sources from './flagship-sources.json';

export const flagshipPreviews=sources.previews;
export type OfficialPreview=(typeof flagshipPreviews)[number];

export function officialPreviews(id:string){
  return sources.previews.filter(preview=>preview.card_id===id);
}

export const flagshipDocuments=sources.documents;
