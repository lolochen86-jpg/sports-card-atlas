import Link from 'next/link';

export default function Page(){
  return <main className="content-page">
    <h1>資料狀態</h1>
    <h2>2026–27 Topps Flagship Basketball</h2>
    <p>依官方清單匯入 56 個卡組、2,244 個主卡位。1,000 筆附屬變體另列於單卡；清單版本與逐卡資料仍待複核。</p>
    <p><Link href="/sources/flagship/checklist">官方 Checklist ↗</Link> · <Link href="/sources/flagship/odds">官方 Odds ↗</Link></p>
    <h2>圖片與收藏</h2>
    <p>單卡頁保留缺圖位置及可查的官方預覽連結。會員可投稿，站長審核後才更新圖鑑及好心人名單。收藏保存在此瀏覽器。</p>
    <h2>資料原則</h2>
    <p>卡號、版本限量與實體流水號分開。盒型比較依官方配置，逐卡關聯缺證據時留白。標示 DEMO 的系列為虛構示範。本圖鑑為非官方收藏工具。</p>
    <Link href="/">返回卡牆 →</Link>
  </main>;
}
