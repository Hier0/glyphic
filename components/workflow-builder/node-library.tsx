import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  Search,
  Bot,
  FileDown,
  FileText,
  LayoutGrid,
  Circle,
  Plus,
  Globe,
  MonitorDown,
  Download,
  Type,
  Link,
  RefreshCw,
  SplitSquareHorizontal,
  Layers,
  ChevronRight 
} from 'lucide-react';
import { AskAINode, ExtractDataNode, FlowBasicsNode } from './nodes';

interface NodeLibraryProps {
  onAddNode: (nodeType: string) => void;
}

export function NodeLibrary({ onAddNode }: NodeLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'core' | 'integrations' | 'custom'>('core');

  const renderNodeButton = (
    icon: React.ReactNode,
    label: string,
    nodeType: string,
    colorClass: string = 'text-pink-500'
  ) => (
    <Button
      variant="ghost"
      className="justify-start h-auto py-3 px-4 bg-gray-50"
      onClick={() => onAddNode(nodeType)}
    >
      <div className={`mr-2 h-4 w-4 ${colorClass}`}>{icon}</div>
      <div className="text-left">
        <div className="font-medium">{label}</div>
      </div>
    </Button>
  );

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input className="pl-9 bg-gray-50" placeholder="Search or ask anything..." />
      </div>

      {/* Category Buttons */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className={`rounded-full ${selectedCategory === 'core' ? '' : 'bg-gray-50'}`}
          onClick={() => setSelectedCategory('core')}
        >
          Core Nodes
        </Button>
        <Button 
          variant="outline" 
          className={`rounded-full ${selectedCategory === 'integrations' ? '' : 'bg-gray-50'}`}
          onClick={() => setSelectedCategory('integrations')}
        >
          Integrations
        </Button>
        <Button 
          variant="outline" 
          className={`rounded-full ${selectedCategory === 'custom' ? '' : 'bg-gray-50'}`}
          onClick={() => setSelectedCategory('custom')}
        >
          Custom Nodes
        </Button>
      </div>

      {/* Node Categories */}
      <div className="space-y-4">
        {/* AI Category */}
        <Card className="border rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-pink-100 p-2">
                  <Bot className="h-5 w-5 text-pink-500" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Using AI</h3>
                  <span className="text-sm text-gray-500">12</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Leverage AI for various tasks</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {renderNodeButton(<Bot />, "Ask AI", "askAI")}
            {renderNodeButton(<FileDown />, "Extract Data", "extractData")}
            {renderNodeButton(<FileText />, "Summarizer", "summarizer")}
            {renderNodeButton(<LayoutGrid />, "Categorizer", "categorizer")}
            {renderNodeButton(<Circle />, "Scorer", "scorer")}
            {renderNodeButton(<Plus />, "7 more", "more")}
          </CardContent>
        </Card>

        {/* Web Scraping Category */}
        <Card className="border rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-yellow-100 p-2">
                  <Globe className="h-5 w-5 text-yellow-700" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Web Scraping</h3>
                  <span className="text-sm text-gray-500">4</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Extract data from websites automatically</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {renderNodeButton(<Download />, "Website Scraper", "websiteScraper", "text-yellow-700")}
            {renderNodeButton(<LayoutGrid />, "Website Crawler", "websiteCrawler", "text-yellow-700")}
            {renderNodeButton(<MonitorDown />, "Web Agent Scraper", "webAgentScraper", "text-yellow-700")}
            {renderNodeButton(<Bot />, "AI Web Browser", "aiWebBrowser", "text-yellow-700")}
          </CardContent>
        </Card>

        {/* Text Manipulation Category */}
        <Card className="border rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Type className="h-5 w-5 text-orange-700" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Text Manipulation</h3>
                  <span className="text-sm text-gray-500">5</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Process and modify text content</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {renderNodeButton(<Link />, "Combine Text", "combineText", "text-orange-700")}
            {renderNodeButton(<Type />, "Text Formatter", "textFormatter", "text-orange-700")}
            {renderNodeButton(<RefreshCw />, "Find And Replace", "findReplace", "text-orange-700")}
            {renderNodeButton(<SplitSquareHorizontal />, "Split Text", "splitText", "text-orange-700")}
            {renderNodeButton(<Layers />, "Chunk Text", "chunkText", "text-orange-700")}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 