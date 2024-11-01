'use client'

import { useState, useCallback } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  NodeProps,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Calendar,
  Settings,
  HelpCircle,
  Share2,
  Play,
  ChevronRight,
  Download,
  Bot,
  FileDown,
  FileText,
  Circle,
  MonitorDown,
  LayoutGrid,
  Globe,
  Maximize2,
  Link,
  RefreshCw,
  Layers,
  SplitSquareHorizontal,
  Type,
} from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { NodeLibrary } from './workflow-builder/node-library'
import { nodeConfigs } from './workflow-builder/nodes/node-configs'

// Custom Node Components
function FlowBasicsNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-gray-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Settings className="h-4 w-4" />
          Flow Basics
          <HelpCircle className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Default value</Label>
            <Input placeholder="tim@hubspot.com" />
          </div>
          <div className="space-y-2">
            <Label>Input name</Label>
            <Input placeholder="email" />
          </div>
          <div className="flex items-center justify-between">
            <Label>Show as user input</Label>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input placeholder="The email of the new user." />
          </div>
        </div>
      </CardContent>
      <Handle
        type="source"
        position={Position.Bottom}
        id="response"
        className="w-3 h-3 bg-gray-300 border-2 border-white rounded-full"
        style={{ bottom: '-12px' }}
      />
    </Card>
  )
}

function AskAINode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-pink-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Bot className="h-4 w-4 text-pink-500" />
          Ask AI
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-pink-50/50 rounded-lg p-3 text-sm text-pink-900">
          Prompt an AI language model. Provide all relevant context and use detailed prompts to get the best results.
        </div>
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Textarea placeholder="Summarize the article in the context" />
        </div>
        <div className="space-y-2">
          <Label>Context</Label>
          <Textarea placeholder="(Optional) This is additional context for the AI model that can be referenced in the prompt" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
      <Handle
        type="target"
        position={Position.Top}
        id="prompt"
        className="w-3 h-3 bg-gray-300 border-2 border-white rounded-full -top-1 left-[30%]"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="context"
        className="w-3 h-3 bg-gray-300 border-2 border-white rounded-full -top-1 left-[70%]"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="response"
        className="w-3 h-3 bg-gray-300 border-2 border-white rounded-full"
        style={{ bottom: '-12px' }}
      />
    </Card>
  )
}

function ExtractDataNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-pink-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <FileDown className="h-4 w-4 text-pink-500" />
          Extract Data
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-pink-50/50 rounded-lg p-3 text-sm text-pink-900">
          Extract key pieces of information or a list of information from some input text.
        </div>
        <div className="flex items-center justify-between">
          <Label>Extract List?</Label>
          <Switch />
        </div>
        <div className="space-y-2">
          <Label>Data</Label>
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Data
          </Button>
        </div>
        <div className="space-y-2">
          <Label>Additional Context</Label>
          <Input placeholder="(Optional) - The item that I am extracting for a different editor" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        className="w-3 h-3 bg-gray-300 border-2 border-white rounded-full"
        style={{ top: '-12px' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        className="w-3 h-3 bg-gray-300 border-2 border-white rounded-full"
        style={{ bottom: '-12px' }}
      />
    </Card>
  )
}

// Node types definition
const nodeTypes = {
  flowBasics: FlowBasicsNode,
  askAI: AskAINode,
  extractData: ExtractDataNode,
}

// Initial nodes
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'flowBasics',
    position: { x: 100, y: 100 },
    data: { label: 'Flow Basics' },
  },
]

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedTab, setSelectedTab] = useState('nodes')

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onAddNode = useCallback((type: string) => {
    const config = nodeConfigs[type as keyof typeof nodeConfigs];
    const newNode: Node = {
      id: `${type}_${Date.now()}`,
      type,
      position: { 
        x: Math.random() * 500, 
        y: Math.random() * 500 
      },
      data: { 
        label: config.title,
        description: config.description,
        fields: config.fields,
        icon: config.icon,
        category: config.category
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-[400px] border-r bg-background">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b px-4 h-14">
              <TabsTrigger value="nodes" className="relative px-4 data-[state=active]:bg-transparent">
                Node Library
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary data-[state=active]:block hidden" />
              </TabsTrigger>
              <TabsTrigger value="subflows" className="relative px-4 data-[state=active]:bg-transparent">
                Subflow Library
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary data-[state=active]:block hidden" />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="nodes" className="mt-0">
            <NodeLibrary onAddNode={onAddNode} />
          </TabsContent>
          <TabsContent value="subflows" className="mt-0">
            <div className="p-4">Subflow Library Content</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" />
              Run
            </Button>
          </div>
        </div>

        {/* Flow Canvas */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}