import { ChatContainer } from '@/ui/components'
import type { Metadata } from 'next';
 
export function generateMetadata(): Metadata {
  return {
    title: 'Dolado - Explore todo o potencial do varejo digital',
    description: 'Todas as soluções para a sua marca'
    }
}

export default function HomePage() {
  return <ChatContainer />;
}