import type {Product} from './catalog';
export type BoxFormat={id:string;name:string;packs:number;cardsPerPack:number;hit:string;exclusive:string;source:string;locator:string};
export const flagshipGuide='https://ripped.topps.com/2026-27-topps-flagship-basketball-which-box-is-best/';
export const flagshipSlug='2026-27-topps-basketball';
export const latestProducts:Product[]=[
 {id:'official:'+flagshipSlug,slug:flagshipSlug,name:'2026–27 Topps Flagship Basketball',sport:'NBA',year:2026,season:'2026–27',brand:'Topps',manufacturer:'Topps',release:null,slots:0,sets:0,cover:false,boxFormat:'7 種官方盒型／包裝',officialUrl:flagshipGuide,checklistStatus:'imported_needs_review',boxCount:7}
];
export const flagshipFormats:BoxFormat[]=[
 {id:'hobby',name:'Hobby Box',packs:20,cardsPerPack:12,hit:'1 張簽名或布料卡',exclusive:'Victory、Player Number Variations',source:flagshipGuide,locator:'Box Breakdown 表格；Hobby Box 段落'},
 {id:'jumbo',name:'Hobby Jumbo Box',packs:10,cardsPerPack:28,hit:'1 張簽名 + 1 張布料卡',exclusive:'Sandglitter',source:flagshipGuide,locator:'Box Breakdown 表格；Hobby Jumbo Box 段落'},
 {id:'value',name:'Value Box',packs:6,cardsPerPack:12,hit:'6 張 Inserts；含 Season Tip Off',exclusive:'Season Tip Off',source:flagshipGuide,locator:'Box Breakdown 表格；Value Box 段落'},
 {id:'mega',name:'Mega Box',packs:12,cardsPerPack:15,hit:'4 張 1981-82 Topps Basketball Inserts',exclusive:'待確認；官方未在此宣稱 Mega 專屬平行版',source:flagshipGuide,locator:'Box Breakdown 表格；Mega Box 段落'},
 {id:'fanatics',name:'Fanatics Value Box',packs:8,cardsPerPack:12,hit:'9 張 Inserts；每包 1 張 Topps Foil Pattern',exclusive:'Topps Foil Pattern',source:flagshipGuide,locator:'Box Breakdown 表格；Fanatics Value Box 段落'},
 {id:'hanger',name:'Hanger Pack',packs:1,cardsPerPack:48,hit:'2 張 Diamante；1 張 1981-82 Insert',exclusive:'Diamante',source:flagshipGuide,locator:'Box Breakdown 表格；Hanger Pack 段落'},
 {id:'fat',name:'Fat Pack',packs:1,cardsPerPack:24,hit:'2 張 Inserts',exclusive:'無專屬聲明；Holo Foil 為零售格式共用',source:flagshipGuide,locator:'Box Breakdown 表格；Fat Pack 段落'}
];
export function formatsFor(slug:string):BoxFormat[]{return slug===flagshipSlug?flagshipFormats:[];}
