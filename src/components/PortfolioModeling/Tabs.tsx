import { useState } from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-bottom: 16px;
`;

const TabList = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 12px 16px;
  border: none;
  background: none;
  color: ${props => props.$active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  cursor: pointer;
  white-space: nowrap;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--color-primary);
    opacity: ${props => props.$active ? 1 : 0};
    transition: opacity 0.2s;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const TabInput = styled.input`
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.95em;
  width: 120px;
`;

const CloseButton = styled.span`
  margin-left: 24px;
  opacity: 0.6;
  font-size: 1.2em;
  line-height: 1;
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: var(--color-error);
  }
`;

const AddTabButton = styled(Tab)`
  color: var(--color-text-secondary);
  font-size: 1.2em;
  padding: 12px;
  
  &:hover {
    color: var(--color-primary);
  }
`;

interface TabsProps {
  tabs: Array<{
    id: string;
    name: string;
  }>;
  activeTab: string;
  onTabChange: (id: string) => void;
  onAddTab: () => void;
  onRemoveTab: (id: string) => void;
  onRenameTab: (id: string, name: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange, onAddTab, onRemoveTab, onRenameTab }: TabsProps) {
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleDoubleClick = (tab: { id: string; name: string }) => {
    setEditingTab(tab.id);
    setEditValue(tab.name);
  };

  const handleBlur = () => {
    if (editingTab && editValue.trim()) {
      onRenameTab(editingTab, editValue.trim());
    }
    setEditingTab(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditingTab(null);
    }
  };

  return (
    <TabsContainer>
      <TabList>
        {tabs.map(tab => (
          <Tab 
            key={tab.id}
            $active={tab.id === activeTab}
            onClick={() => onTabChange(tab.id)}
            onDoubleClick={() => handleDoubleClick(tab)}
          >
            {editingTab === tab.id ? (
              <TabInput
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                {tab.name}
                {tabs.length > 1 && (
                  <CloseButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveTab(tab.id);
                    }}
                  >
                    ×
                  </CloseButton>
                )}
              </>
            )}
          </Tab>
        ))}
        <AddTabButton 
          $active={false}
          onClick={onAddTab}
        >
          +
        </AddTabButton>
      </TabList>
    </TabsContainer>
  );
} 