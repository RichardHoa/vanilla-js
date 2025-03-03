import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

// Function to copy files while preserving structure
function copyFilesRecursive(srcDir, destDir, baseDir) {
  const items = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(srcDir, item.name);
    const relativePath = path.relative(baseDir, srcPath); // Keep folder structure
    const destPath = path.join(destDir, relativePath);

    if (item.isDirectory()) {
      copyFilesRecursive(srcPath, destDir, baseDir);
    } else if (item.isFile() && item.name.endsWith(".html")) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [
    {
      name: "copy-html-files",
      closeBundle() {
        console.log("🔄 Copying HTML files AFTER build...");
        const srcRoot = path.resolve("src"); 
        const destRoot = path.resolve("dist/src");

        copyFilesRecursive(srcRoot, destRoot, srcRoot);
        console.log("✅ All HTML files copied successfully!");
      },
    },
  ],
});
