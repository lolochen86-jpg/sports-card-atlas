export type OwnedCard={id:string;number:string;player:string;product:string;slug:string;set:string;quantity:number;note:string;updated:string};
const key='sports-card-atlas.local-collection.v1';
export function readCollection():OwnedCard[]{try{const v=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(v)?v:[];}catch{return [];}}
export function saveCollection(card:OwnedCard){const rows=readCollection().filter(c=>c.id!==card.id);if(card.quantity>0)rows.push(card);localStorage.setItem(key,JSON.stringify(rows));}
