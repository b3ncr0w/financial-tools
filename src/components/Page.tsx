import { ContentBlock, Article } from "../cms/types";
import styled from "styled-components";
import { Markdown } from "./Markdown";
import { ArticleGrid } from "./ArticleGrid";
import { PortfolioModeling } from './PortfolioModeling';

interface PageProps {
  title?: string;
  description?: string;
  content?: ContentBlock[];
  articles?: Article[];
}

export function Page({ content = [], articles }: PageProps) {
  return (
    <Container>
      <Content>
        {content.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return <Heading key={index}>{block.text}</Heading>;
            case 'markdown':
              return <Markdown key={index} content={block.text} />;
            case 'component':
              switch (block.name) {
                case 'portfolio-modeling':
                  return <PortfolioModeling key={index} {...block.props} />;
                default:
                  return null;
              }
            default:
              return <Paragraph key={index}>{block.text}</Paragraph>;
          }
        })}
        {articles && <ArticleGrid articles={articles} />}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Content = styled.article`
  width: 100%;
  max-width: 800px;
  padding: var(--spacing-lg);
  border-radius: 8px;
  color: var(--color-text);
`;

const Heading = styled.h2`
  margin: var(--spacing-lg) 0 var(--spacing-md);
  font-size: var(--font-size-h2);
  color: var(--color-text);
`;

const Paragraph = styled.p`
  margin: 0 0 var(--spacing-md);
  line-height: 1.6;
  color: var(--color-text);
`; 