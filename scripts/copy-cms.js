import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '../src/cms');
const distDir = join(__dirname, '../dist/assets');

// Create the dist directories
mkdirSync(distDir, { recursive: true });
mkdirSync(join(distDir, 'en'), { recursive: true });
mkdirSync(join(distDir, 'pl'), { recursive: true });
mkdirSync(join(distDir, 'en/pages'), { recursive: true });
mkdirSync(join(distDir, 'pl/pages'), { recursive: true });

// Copy YAML files
try {
  // Copy meta files
  copyFileSync(join(srcDir, 'en/meta.yaml'), join(distDir, 'en/meta.yaml'));
  copyFileSync(join(srcDir, 'pl/meta.yaml'), join(distDir, 'pl/meta.yaml'));
  
  // Copy page files
  copyFileSync(
    join(srcDir, 'en/pages/portfolio-modeling.yaml'),
    join(distDir, 'en/pages/portfolio-modeling.yaml')
  );
  copyFileSync(
    join(srcDir, 'pl/pages/modelowanie-portfela.yaml'),
    join(distDir, 'pl/pages/modelowanie-portfela.yaml')
  );
  
  console.log('CMS files copied successfully');
} catch (error) {
  console.error('Error copying CMS files:', error);
  process.exit(1);
} 