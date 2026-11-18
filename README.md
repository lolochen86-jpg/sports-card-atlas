# Sports Card Atlas

An open-source, local-first sports card wall and moderated contribution portal.

繁體中文介面。以運動 → 年份 → 系列瀏覽密集卡牆，保留缺圖位置，將卡片身分、圖片、平行版本與實體收藏分開。

首批正式目錄為 2026–27 Topps Flagship Basketball，依 Topps checklist 建立卡位並保留來源頁碼。另提供標有 DEMO 的虛構系列供測試。正式系列圖片以官方預覽連結與站長採用的投稿提供。

## Quick start

需要 Node.js 26+ 與 npm。原生相依套件如無對應預編譯版本，需要 Python／C++ build tools。

```sh
npm ci
npm run setup
npm run build
npm start
```

開啟 http://127.0.0.1:3240 。`npm run dev` 為開發模式。`setup` 產生獨立合成示範資料；資料已存在時不覆寫。

## Features

- NBA／MLB、年份與系列入口，卡組、球員、卡號、簽名與布料交叉篩選。
- 自然卡號排序、分頁、卡片大小切換、缺圖保留、正背面與大圖。
- 瀏覽器本機收藏；登入帳號不會自動將舊 localStorage 收藏變成雲端資料。
- 首批 50 個會員帳號名額、報錯與圖片投稿、管理員採用／退回／撤回、首頁好心人名單及公開意願設定。
- 待審圖片私有存取、格式解碼與重編碼、伺服器工作階段、來源檢查、頻率限制與審核紀錄。
- 候選圖、已採用圖與官方預覽連結分開；不因檔名相似就自動核准。

## 管理員

```sh
npm run setup:owner
```

沒有預設密碼。命令產生隨機初始密碼，僅寫入本機 `data/community/owner-initial-credentials.txt`；此檔不得發布。登入 `/community` 後請修改密碼，再前往 `/admin`。重跑命令不會重設既有管理員。

一般會員可自行註冊，管理員不佔 50 名額。這是帳號上限，不是真人認證；尚未提供 Email 驗證／忘記密碼。修改密碼會使其他工作階段失效。

## 自備資料

`.env.example` 列出本機唯讀 catalog／圖片來源設定。參考 [資料介面](docs/data-contract.md)。不要把真實 SQLite、原圖、登入資訊或官方 PDF 提交到 Git。MIT 授權不授予第三方卡圖、商標或上傳內容的使用權。

所有示範圖片由 `seed-demo.cjs` 產生，明列 DEMO／NOT A REAL TRADING CARD；沒有使用真實卡圖。

## 測試

```sh
npm run typecheck
npm run build
npm test
npm run check:public
```

測試使用獨立暫存會員目錄與 3241 埠，不會讀寫其他專案。第一次執行公開檔案檢查前需為 Git checkout；檢查僅針對 Git 追蹤檔。

## 部署狀態

支援本機 SQLite，以及 Vercel＋Supabase Postgres／私有 Storage 雲端模式。雲端保留帳號密碼與伺服器工作階段，並非 Supabase Auth。雲端上傳總量上限 4 MB；收藏仍在瀏覽器，不隨登入同步。部署需套用 migration 並設定伺服器環境變數，見 [部署說明](docs/deployment.md)。

此專案不是 Topps、Panini、NBA、MLB 或任何球員的官方網站。匯入者須確認來源、圖片權利及資料正確性。

## License

程式及原創合成示範為 [MIT](LICENSE)。依賴與第三方內容請見 [NOTICE](NOTICE.md)。歡迎閱讀 [CONTRIBUTING](CONTRIBUTING.md) 與 [SECURITY](SECURITY.md)。
