import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Code,
  MessageSquare,
  Cloud,
} from 'lucide-react';
import { nodeConfigs } from './nodes/node-configs';
import { NodeButton } from './components/node-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bot, ChevronRight } from 'lucide-react';

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
          <div className="space-y-4">
            {/* AI Nodes Card */}
            <Card className="border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-pink-100 p-2">
                      <Bot className="h-5 w-5 text-pink-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Using AI</h3>
                      <span className="text-sm text-gray-500">5</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Leverage AI for various tasks</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <NodeButton nodeType="askAI" config={nodeConfigs.askAI} onAddNode={onAddNode} variant="ai" />
                <NodeButton nodeType="extractData" config={nodeConfigs.extractData} onAddNode={onAddNode} variant="ai" />
                <NodeButton nodeType="summarizer" config={nodeConfigs.summarizer} onAddNode={onAddNode} variant="ai" />
                <NodeButton nodeType="categorizer" config={nodeConfigs.categorizer} onAddNode={onAddNode} variant="ai" />
                <NodeButton nodeType="scorer" config={nodeConfigs.scorer} onAddNode={onAddNode} variant="ai" />
              </CardContent>
            </Card>

            {/* Web Scraping Nodes Card */}
            <Card className="border rounded-xl">
              {/* ... card header ... */}
              <CardContent className="grid grid-cols-2 gap-2">
                <NodeButton nodeType="websiteScraper" config={nodeConfigs.websiteScraper} onAddNode={onAddNode} variant="web-scraping" />
                <NodeButton nodeType="websiteCrawler" config={nodeConfigs.websiteCrawler} onAddNode={onAddNode} variant="web-scraping" />
                <NodeButton nodeType="webAgentScraper" config={nodeConfigs.webAgentScraper} onAddNode={onAddNode} variant="web-scraping" />
                <NodeButton nodeType="aiWebBrowser" config={nodeConfigs.aiWebBrowser} onAddNode={onAddNode} variant="web-scraping" />
              </CardContent>
            </Card>

            {/* Text Manipulation Nodes Card */}
            <Card className="border rounded-xl">
              {/* ... card header ... */}
              <CardContent className="grid grid-cols-2 gap-2">
                <NodeButton nodeType="combineText" config={nodeConfigs.combineText} onAddNode={onAddNode} variant="text" />
                <NodeButton nodeType="textFormatter" config={nodeConfigs.textFormatter} onAddNode={onAddNode} variant="text" />
                <NodeButton nodeType="findReplace" config={nodeConfigs.findReplace} onAddNode={onAddNode} variant="text" />
                <NodeButton nodeType="splitText" config={nodeConfigs.splitText} onAddNode={onAddNode} variant="text" />
                <NodeButton nodeType="chunkText" config={nodeConfigs.chunkText} onAddNode={onAddNode} variant="text" />
              </CardContent>
            </Card>
          </div>
        )}
        
        {selectedCategory === 'integrations' && (
          <div className="space-y-4">
            {/* Developer Tools Card */}
            <Card className="border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Code className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Developer Tools</h3>
                      <span className="text-sm text-gray-500">2</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Connect to development platforms</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <NodeButton nodeType="github" config={nodeConfigs.github} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="postgres" config={nodeConfigs.postgres} onAddNode={onAddNode} variant="integration" />
              </CardContent>
            </Card>

            {/* Communication Card */}
            <Card className="border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-purple-100 p-2">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Communication</h3>
                      <span className="text-sm text-gray-500">4</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Connect to messaging platforms</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <NodeButton nodeType="slack" config={nodeConfigs.slack} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="gmail" config={nodeConfigs.gmail} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="discord" config={nodeConfigs.discord} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="twilio" config={nodeConfigs.twilio} onAddNode={onAddNode} variant="integration" />
              </CardContent>
            </Card>

            {/* Cloud Storage Card */}
            <Card className="border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-orange-100 p-2">
                      <Cloud className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Cloud Storage</h3>
                      <span className="text-sm text-gray-500">1</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Connect to storage services</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <NodeButton nodeType="s3" config={nodeConfigs.s3} onAddNode={onAddNode} variant="integration" />
              </CardContent>
            </Card>
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