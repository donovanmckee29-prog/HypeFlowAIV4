const fs = require('fs');
const path = require('path');

// Copy build files to root for static GitHub Pages deployment
function copyBuildToRoot() {
  const buildDir = path.join(__dirname, 'build');
  const rootDir = __dirname;

  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    return;
  }

  // Copy all files from build to root
  function copyRecursive(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  // Copy build files to root
  copyRecursive(buildDir, rootDir);
  
  console.log('✅ Build files copied to root directory');
  console.log('📁 Ready for static GitHub Pages deployment');
}

copyBuildToRoot();
