import { ContentBlock, Article } from "../cms/types";
import styled from "styled-components";
import { Markdown } from "./Markdown";
import { ArticleGrid } from "./ArticleGrid";

interface PageProps {
  title?: string;
  description?: string;
  content?: ContentBlock[];
  articles?: Article[];
}

export function Page({ title, description, content = [], articles }: PageProps) {
  if (!title) return null;

  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        {content.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return <Heading key={index}>{block.text}</Heading>;
            case 'markdown':
              return <Markdown key={index} content={block.text} />;
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
  background: var(--color-surface);
  border-radius: 8px;
  color: var(--color-text);
`;

const Title = styled.h1`
  margin: 0 0 var(--spacing-md);
  font-size: var(--font-size-h1);
  color: var(--color-text);
`;

const Description = styled.p`
  margin: 0 0 var(--spacing-lg);
  color: var(--color-text);
  opacity: 0.8;
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