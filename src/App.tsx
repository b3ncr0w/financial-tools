import { Navigation } from './components/Navigation';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';
import { useApp } from './context/AppContext'
import { getData, initializeCMSData } from './cms/getData';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NavigationLink, Page as PageType, Article } from './cms/types';
import { useEffect, useState } from 'react';
import { ArticlePage } from './components/ArticlePage';
import { DynamicPage } from './components/DynamicPage';

interface PageData {
  navigation: NavigationLink[];
  meta: {
    title: string;
  };
  articles: Record<string, Article>;
  pages: Record<string, PageType>;
}

function App() {
  const { language } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cmsData, setCmsData] = useState<PageData | null>(null);

  useEffect(() => {
    let mounted = true;

    const initCMS = async () => {
      try {
        setIsLoading(true);
        const initialized = await initializeCMSData();
        
        if (!mounted) return;
        
        if (initialized) {
          const data = getData();
          setCmsData(data[language] as PageData);
        } else {
          throw new Error('Failed to initialize CMS data');
        }
      } catch (err) {
        console.error('Failed to initialize CMS:', err);
        if (mounted) {
          setError('Failed to load content');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initCMS();

    return () => {
      mounted = false;
    };
  }, [language]);

  useEffect(() => {
    if (cmsData?.meta?.title) {
      document.title = cmsData.meta.title;
    }
  }, [cmsData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!cmsData) return null;

  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Navigation data={cmsData.navigation} />
          <Controls>
            <LanguageSwitch />
            <ThemeSwitch />
          </Controls>
        </Header>
        <Main>
          <Routes>
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/*" element={<DynamicPage />} />
          </Routes>
        </Main>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
`;

const Header = styled.header`
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
`;

const Main = styled.main`
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-sm);
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
`;