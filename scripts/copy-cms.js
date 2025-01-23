import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '../src/cms');
const publicDir = join(__dirname, '../public/assets');

// Create the public directories
mkdirSync(join(publicDir, 'en'), { recursive: true });
mkdirSync(join(publicDir, 'pl'), { recursive: true });
mkdirSync(join(publicDir, 'en/pages'), { recursive: true });
mkdirSync(join(publicDir, 'pl/pages'), { recursive: true });

// Copy YAML files
try {
  // Copy meta files
  copyFileSync(join(srcDir, 'en/meta.yaml'), join(publicDir, 'en/meta.yaml'));
  copyFileSync(join(srcDir, 'pl/meta.yaml'), join(publicDir, 'pl/meta.yaml'));
  
  // Copy page files
  copyFileSync(
    join(srcDir, 'en/pages/portfolio-modeling.yaml'),
    join(publicDir, 'en/pages/portfolio-modeling.yaml')
  );
  copyFileSync(
    join(srcDir, 'pl/pages/modelowanie-portfela.yaml'),
    join(publicDir, 'pl/pages/modelowanie-portfela.yaml')
  );
  
  console.log('CMS files copied successfully');
} catch (error) {
  console.error('Error copying CMS files:', error);
  process.exit(1);
} 