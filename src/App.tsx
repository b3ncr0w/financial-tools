import { Navigation } from './components/Navigation';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';
import { useApp } from './context/AppContext'
import { getData } from './cms/getData';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NavigationLink, Page as PageType, Article } from './cms/types';
import { useEffect } from 'react';
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
  const data = getData[language] as PageData;

  useEffect(() => {
    document.title = data.meta.title;
  }, [language]);

  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Navigation data={data.navigation} />
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