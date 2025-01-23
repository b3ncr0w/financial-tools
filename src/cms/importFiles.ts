interface CMSData {
  data: any;
  slugMappings: Record<string, string>;
  pageSlugMappings: Record<string, string>;
}

interface YAMLModule {
  default: {
    id: string;
    slug?: string;
    [key: string]: any;
  };
}

async function importFiles(): Promise<CMSData> {
  const modules = import.meta.glob<YAMLModule>([
    './pl/**/*.yaml',
    './en/**/*.yaml'
  ]);

  const data: Record<string, any> = {};
  const slugMappings: Record<string, string> = {};
  const pageSlugMappings: Record<string, string> = {};

  for (const path in modules) {
    const module = await modules[path]();
    const content = module.default;
    
    // Extract language and type from path
    const [, lang, type] = path.split('/');
    
    if (!data[lang]) {
      data[lang] = {};
    }
    if (!data[lang][type]) {
      data[lang][type] = [];
    }

    data[lang][type].push(content);

    if (content.slug) {
      if (type === 'pages') {
        pageSlugMappings[content.slug] = content.id;
      } else {
        slugMappings[content.slug] = content.id;
      }
    }
  }

  return { data, slugMappings, pageSlugMappings };
}

let cmsData: CMSData | null = null;

export async function initializeCMS() {
  if (!cmsData) {
    const { data: getData, slugMappings: articleSlugs, pageSlugMappings } = await importFiles();
    cmsData = { data: getData, slugMappings: articleSlugs, pageSlugMappings };
  }
  return cmsData;
}

export function getCMSData() {
  if (!cmsData) {
    throw new Error('CMS not initialized. Call initializeCMS first.');
  }
  return cmsData;
} 