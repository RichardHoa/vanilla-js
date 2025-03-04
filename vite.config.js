import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

function copyHTMLFiles() {
  const srcDir = path.resolve(__dirname, "src");
  const distDir = path.resolve(__dirname, "dist/src");

  function copyFilesRecursive(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const srcFile = path.join(dir, file);
      const relativePath = path.relative(srcDir, srcFile);
      const distFile = path.join(distDir, relativePath);

      if (fs.statSync(srcFile).isDirectory()) {
        fs.mkdirSync(distFile, { recursive: true });
        copyFilesRecursive(srcFile);
      } else if (file.endsWith(".html") && file !== "index.html") {
        fs.mkdirSync(path.dirname(distFile), { recursive: true });
        fs.copyFileSync(srcFile, distFile);
        console.log(`Copied: ${relativePath}`);
      }
    });
  }

  if (fs.existsSync(srcDir)) {
    copyFilesRecursive(srcDir);
  }
}

export default defineConfig({
  build: {
    outDir: "dist",
    target: "esnext",
  },
  plugins: [
    {
      name: "copy-html-files",
      writeBundle() {
        copyHTMLFiles();
      },
    },
  ],
});
