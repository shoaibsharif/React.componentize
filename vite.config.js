import { defineConfig } from "vite";
import reactRefresh from "vite-react-jsx";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
