import type {Product} from './catalog';
export type BoxFormat={id:string;name:string;packs:number;cardsPerPack:number;hit:string;exclusive:string;source:string;locator:string};
export const flagshipSlug='local-flagship';
export const latestProducts:Product[]=[];
export function formatsFor(_slug:string):BoxFormat[]{return []}
