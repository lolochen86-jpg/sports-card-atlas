'use client';

import Link from 'next/link';
import {useState} from 'react';
import type {OfficialPreview} from '@/lib/official-previews';

function PreviewTile({preview,showCardLink}:{preview:OfficialPreview;showCardLink:boolean}){
  const [unavailable,setUnavailable]=useState(false);
  return <figure className="official-card-preview">
    <a className="official-card-art" href={preview.image_url} target="_blank" rel="noreferrer">
      {unavailable ? <span>圖片暫時無法載入<br/>開啟 Topps 原圖 ↗</span> :
        <img src={preview.image_url} alt={preview.label} referrerPolicy="no-referrer" decoding="async" onError={()=>setUnavailable(true)}/>}
    </a>
    <figcaption>
      {showCardLink?<Link href={'/cards/'+preview.card_id}>{preview.label}</Link>:<strong>{preview.label}</strong>}
      <small>{preview.version}</small>
    </figcaption>
  </figure>;
}

export function OfficialPreviewGallery({previews,showCardLinks=false}:{previews:OfficialPreview[];showCardLinks?:boolean}){
  if(!previews.length)return null;
  return <section className="official-card-gallery" aria-label="Topps 官方樣卡">
    <header>
      <h2>Topps 官方樣卡</h2>
      <a href={previews[0].source_url} target="_blank" rel="noreferrer">官方來源 ↗</a>
    </header>
    <div className="official-card-grid">
      {previews.map(preview=><PreviewTile key={preview.image_url} preview={preview} showCardLink={showCardLinks}/>)}
    </div>
  </section>;
}
