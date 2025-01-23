import { config } from "./config";
import { CMS, Page } from "./types";
import yaml from 'js-yaml';

interface CMSData {
  data: Record<string, CMS>;
  slugMappings: Record<string, Record<string, string>>;
  pageSlugMappings: Record<string, Record<string, string>>;
}

interface BaseYAMLModule {
  id: string;
  slug: string;
  title: string;
}

interface PageYAMLModule extends BaseYAMLModule {
  order?: number;
  menuTitle?: string;
  type: 'page';
}

interface ArticleYAMLModule extends BaseYAMLModule {
  date: string;
  type: 'article';
}

interface MetaYAMLModule {
  title: string;
  type: 'meta';
}

export const importFiles = async (): Promise<CMSData> => {
  try {
    const modules = import.meta.glob<string>([
      '/public/cms/*/pages/*.yaml',
    ], { 
      eager: true,
      as: 'raw'
    });

    if (Object.keys(modules).length === 0) {
      const alternativeModules = import.meta.glob<string>([
        '../public/cms/*/pages/*.yaml',
        './public/cms/*/pages/*.yaml'
      ], { 
        eager: true,
        as: 'raw'
      });
      if (Object.keys(alternativeModules).length > 0) {
        Object.assign(modules, alternativeModules);
      }
    }

    const data: Record<string, CMS> = {};
    const slugMappings: Record<string, Record<string, string>> = {};
    const pageSlugMappings: Record<string, Record<string, string>> = {};

    Object.keys(config.languages).forEach(lang => {
      data[lang] = {
        navigation: [],
        meta: { title: '' },
        articles: {},
        pages: {}
      };
    });

    for (const path in modules) {
      const yamlContent = modules[path];
      const content = yaml.load(yamlContent) as PageYAMLModule | ArticleYAMLModule | MetaYAMLModule;
      
      const match = path.match(/\/cms\/(\w+)\/(\w+)\/(.*?)\.yaml$/);
      if (!match) continue;
      
      const [, lang, type] = match;

      if (type === 'pages' && content.type === 'page') {
        const pageId = content.id;
        const pagePath = content.slug.startsWith('/') ? content.slug : `/${content.slug}`;
        
        if (!pageSlugMappings[pageId]) {
          pageSlugMappings[pageId] = {};
        }
        pageSlugMappings[pageId][lang] = pagePath;
        
        data[lang].pages[pagePath] = {
          ...content,
          slugs: pageSlugMappings[pageId]
        };
      }
    }

    Object.keys(config.languages).forEach(lang => {
      const pages = Object.values(data[lang].pages) as Array<Page>;
      data[lang].navigation = pages
        .sort((a, b) => (a.order || 999) - (b.order || 999))
        .map(page => ({
          text: page.menuTitle || page.title,
          url: page.slug.startsWith('/') ? page.slug : `/${page.slug}`
        }));
    });

    return { data, slugMappings, pageSlugMappings };
  } catch (error) {
    return { 
      data: {} as Record<string, CMS>, 
      slugMappings: {}, 
      pageSlugMappings: {} 
    };
  }
}

let cmsData: CMSData | null = null;

export async function initializeCMS() {
  if (!cmsData) {
    cmsData = await importFiles();
  }
  return cmsData;
}

export function getCMSData() {
  if (!cmsData) {
    throw new Error('CMS not initialized. Call initializeCMS first.');
  }
  return cmsData;
} 