import { CMSComponent } from '../cms/types'
import { Navigation } from '../components/Navigation'

interface ComponentRendererProps {
  component: CMSComponent
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  switch (component.type) {
    case 'navigation':
      return <Navigation {...component} />
    default:
      return null
  }
} 