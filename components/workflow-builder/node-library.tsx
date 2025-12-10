import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Code,
  MessageSquare,
  Cloud,
  FileSpreadsheet,
  Layers,
  Image,
  Video,
  Cpu,
} from 'lucide-react';
import { nodeConfigs } from './nodes/node-configs';
import { NodeButton } from './components/node-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bot, ChevronRight } from 'lucide-react';

interface NodeLibraryProps {
  onAddNode: (nodeType: string) => void;
}

export function NodeLibrary({ onAddNode }: NodeLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'core' | 'integrations' | 'models' | 'hieroglyphs'>('core');

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
          variant={selectedCategory === 'models' ? 'default' : 'outline'}
          className="rounded-full"
          onClick={() => setSelectedCategory('models')}
        >
          Models
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
                      <span className="text-sm text-gray-500">7</span>
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
                <NodeButton nodeType="imageGeneration" config={nodeConfigs.imageGeneration} onAddNode={onAddNode} variant="ai" />
                <NodeButton nodeType="imageModelSelector" config={nodeConfigs.imageModelSelector} onAddNode={onAddNode} variant="ai" />
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
                <NodeButton nodeType="slackMessageSender" config={nodeConfigs.slackMessageSender} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="gmail" config={nodeConfigs.gmail} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="discord" config={nodeConfigs.discord} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="twilio" config={nodeConfigs.twilio} onAddNode={onAddNode} variant="integration" />
              </CardContent>
            </Card>

            {/* Google Sheets Card */}
            <Card className="border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-green-100 p-2">
                      <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Google Sheets</h3>
                      <span className="text-sm text-gray-500">2</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Read and write data to Google Sheets</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <NodeButton nodeType="googleSheetsReader" config={nodeConfigs.googleSheetsReader} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="googleSheetsWriter" config={nodeConfigs.googleSheetsWriter} onAddNode={onAddNode} variant="integration" />
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
                      <span className="text-sm text-gray-500">4</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Connect to storage services</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <NodeButton nodeType="s3" config={nodeConfigs.s3} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="googleDrive" config={nodeConfigs.googleDrive} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="dropbox" config={nodeConfigs.dropbox} onAddNode={onAddNode} variant="integration" />
                <NodeButton nodeType="iCloud" config={nodeConfigs.iCloud} onAddNode={onAddNode} variant="integration" />
              </CardContent>
            </Card>
          </div>
        )}
        
        {selectedCategory === 'models' && (
          <div className="space-y-4">
            {/* LoRa's Card */}
            <Card className="border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-indigo-100 p-2">
                      <Layers className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">LoRa's</h3>
                      <span className="text-sm text-gray-500">0</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Low-Rank Adaptation models for fine-tuning</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 text-sm">
                  No LoRa models available yet
                </div>
              </CardContent>
            </Card>

            {/* Images Card */}
            <Card className="border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-cyan-100 p-2">
                      <Image className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Images</h3>
                      <span className="text-sm text-gray-500">0</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Image generation and processing models</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 text-sm">
                  No image models available yet
                </div>
              </CardContent>
            </Card>

            {/* Video's Card */}
            <Card className="border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-red-100 p-2">
                      <Video className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Video's</h3>
                      <span className="text-sm text-gray-500">0</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Video generation and processing models</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 text-sm">
                  No video models available yet
                </div>
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