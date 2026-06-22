import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite設定（Reactプラグインを有効化）
// GitHub Pagesは https://<ユーザー名>.github.io/task-board/ 配下で配信されるため、
// 本番ビルド時のみ base をリポジトリ名に合わせる（開発時は "/" のまま）。
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/task-board/" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
}));
