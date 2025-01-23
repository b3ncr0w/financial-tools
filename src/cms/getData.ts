import { CMS } from "./types";
import { importFiles } from "./importFiles";

let cmsData: {
  data: Record<string, CMS>;
  slugMappings: Record<string, Record<string, string>>;
  pageSlugMappings: Record<string, Record<string, string>>;
} | null = null;

export async function initializeCMSData() {
  try {
    if (!cmsData) {
      cmsData = await importFiles();
    }
    return true;
  } catch (error) {
    console.error('Error initializing CMS data:', error);
    return false;
  }
}

export function getCMSData() {
  if (!cmsData) {
    throw new Error('CMS data not initialized. Call initializeCMSData first.');
  }
  return cmsData;
}

export const getData = () => {
  const data = getCMSData();
  return data.data;
}

export function getArticleSlugs() {
  return getCMSData().slugMappings;
}

export function getPageSlugs() {
  return getCMSData().pageSlugMappings;
}
