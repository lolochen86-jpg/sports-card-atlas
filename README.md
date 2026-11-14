# Sports Card Atlas

An open-source, local-first sports card wall and moderated contribution portal.

繁體中文介面。以運動 → 年份 → 系列瀏覽密集卡牆，保留缺圖位置，將卡片身分、圖片、平行版本與實體收藏分開。

**本倉庫是獨立開源示範版，不含原使用者的網站資料、圖庫、會員或憑證。內建人物、系列及圖樣均為虛構，不是真實 NBA／MLB 球員卡或官方清單。**

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

目前是 **可運作的本機 Node.js＋SQLite 版本**。Supabase Auth／Database／Storage adapter 與 Vercel serverless 遷移是後續工作，**沒有宣稱已整合或上線**。不要把可寫會員 DB 放入無持久儲存的函式環境，也不要以部署頁面能開啟當作會員／上傳功能驗收。[部署與限制](docs/deployment.md)

此專案不是 Topps、Panini、NBA、MLB 或任何球員的官方網站。匯入者須確認來源、圖片權利及資料正確性。

## License

程式及原創合成示範為 [MIT](LICENSE)。依賴與第三方內容請見 [NOTICE](NOTICE.md)。歡迎閱讀 [CONTRIBUTING](CONTRIBUTING.md) 與 [SECURITY](SECURITY.md)。
