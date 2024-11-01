import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
} from 'lucide-react';
import { BaseNode } from './nodes/base-node';
import { nodeConfigs } from './nodes/node-configs';

interface NodeLibraryProps {
  onAddNode: (nodeType: string) => void;
}

export function NodeLibrary({ onAddNode }: NodeLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'core' | 'integrations' | 'hieroglyphs'>('core');

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input className="pl-9 bg-gray-50" placeholder="Search or ask anything..." />
      </div>

      {/* Updated Category Buttons */}
      <div className="flex gap-2">
        <Button 
          variant={selectedCategory === 'core' ? 'default' : 'outline'}
          className="rounded-full"
          onClick={() => setSelectedCategory('core')}
        >
          Core Nodes
        </Button>
        <Button 
          variant={selectedCategory === 'integrations' ? 'default' : 'outline'}
          className="rounded-full"
          onClick={() => setSelectedCategory('integrations')}
        >
          Integrations
        </Button>
        <Button 
          variant={selectedCategory === 'hieroglyphs' ? 'default' : 'outline'}
          className="rounded-full"
          onClick={() => setSelectedCategory('hieroglyphs')}
        >
          Hieroglyphs
        </Button>
      </div>

      {/* Node Categories */}
      <div className="space-y-4">
        {selectedCategory === 'core' && (
          <div className="grid grid-cols-3 gap-4">
            {/* AI Nodes */}
            <div onClick={() => onAddNode('askAI')}>
              <BaseNode data={{}} config={nodeConfigs.askAI} />
            </div>
            <div onClick={() => onAddNode('extractData')}>
              <BaseNode data={{}} config={nodeConfigs.extractData} />
            </div>
            <div onClick={() => onAddNode('summarizer')}>
              <BaseNode data={{}} config={nodeConfigs.summarizer} />
            </div>
            <div onClick={() => onAddNode('categorizer')}>
              <BaseNode data={{}} config={nodeConfigs.categorizer} />
            </div>
            <div onClick={() => onAddNode('scorer')}>
              <BaseNode data={{}} config={nodeConfigs.scorer} />
            </div>

            {/* Web Scraping Nodes */}
            <div onClick={() => onAddNode('websiteScraper')}>
              <BaseNode data={{}} config={nodeConfigs.websiteScraper} />
            </div>
            <div onClick={() => onAddNode('websiteCrawler')}>
              <BaseNode data={{}} config={nodeConfigs.websiteCrawler} />
            </div>
            <div onClick={() => onAddNode('webAgentScraper')}>
              <BaseNode data={{}} config={nodeConfigs.webAgentScraper} />
            </div>
            <div onClick={() => onAddNode('aiWebBrowser')}>
              <BaseNode data={{}} config={nodeConfigs.aiWebBrowser} />
            </div>

            {/* Text Manipulation Nodes */}
            <div onClick={() => onAddNode('combineText')}>
              <BaseNode data={{}} config={nodeConfigs.combineText} />
            </div>
            <div onClick={() => onAddNode('textFormatter')}>
              <BaseNode data={{}} config={nodeConfigs.textFormatter} />
            </div>
            <div onClick={() => onAddNode('findReplace')}>
              <BaseNode data={{}} config={nodeConfigs.findReplace} />
            </div>
            <div onClick={() => onAddNode('splitText')}>
              <BaseNode data={{}} config={nodeConfigs.splitText} />
            </div>
            <div onClick={() => onAddNode('chunkText')}>
              <BaseNode data={{}} config={nodeConfigs.chunkText} />
            </div>
          </div>
        )}
        
        {selectedCategory === 'integrations' && (
          <div className="text-center py-8 text-gray-500">
            Integration nodes coming soon...
          </div>
        )}
        
        {selectedCategory === 'hieroglyphs' && (
          <div className="text-center py-8 text-gray-500">
            Hieroglyph nodes coming soon...
          </div>
        )}
      </div>
    </div>
  );
} 