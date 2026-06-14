# ブラウザゲーム集

静的ファイルだけで動作するミニゲーム集です。トップページは `games.json` を読み込み、各ゲームへのリンクをカード形式で表示します。

## ファイル構成

```text
.
├── index.html              # ゲーム一覧ページのHTML
├── games.json              # トップページに表示するゲーム一覧データ
├── shared/                 # 複数ページで使うCSS・JavaScript
│   ├── common.css          # 全ページ共通のリセットとアクセシビリティ補助
│   ├── home.css            # トップページ専用スタイル
│   ├── home.js             # トップページのゲーム一覧描画
│   ├── storage.js          # localStorageの安全なラッパー
│   ├── resize.js           # requestAnimationFrameベースのリサイズ補助
│   └── audio.js            # Web Audioの共有ボリューム管理
└── games/
    └── <game-name>/
        └── index.html      # 各ゲームは単独で起動できるHTMLとして配置
```

## 追加・編集の方針

- 新しいゲームは `games/<game-name>/index.html` に追加し、`games.json` に表示情報を追記します。
- 複数ゲームで再利用する処理は `shared/` に置き、ゲーム固有の処理は各ゲーム配下に閉じ込めます。
- `games.json` の `path` はトップページから見た相対パスにします。
- ハイスコアなど端末内に残すデータは `shared/storage.js` の `SafeStorage` を使います。
