'use client'

import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
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
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Calendar,
  Settings,
  HelpCircle,
  Share2,
  Play,
  Bot,
  FileDown,
  Maximize2,
} from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { NodeLibrary } from './workflow-builder/node-library'
import { AssetsLibrary } from './workflow-builder/assets-library'
import { nodeConfigs } from './workflow-builder/nodes/node-configs'
import { BaseNode } from './workflow-builder/nodes/base-node'
import { GmailNode } from './workflow-builder/nodes/gmail-node'



// Custom Node Components
function FlowBasicsNode({ data, id }: NodeProps) {
  const [fieldValues, setFieldValues] = useState<{
    defaultValue: string;
    inputName: string;
    showAsUserInput: boolean;
    description: string;
  }>(data.fields || {
    defaultValue: '',
    inputName: '',
    showAsUserInput: false,
    description: '',
  });

  // Get output data from this node
  const outputData = useMemo(() => {
    return {
      value: fieldValues.defaultValue,
      name: fieldValues.inputName,
      description: fieldValues.description,
    };
  }, [fieldValues]);

  // Update data when field values change - use ref to prevent infinite loops
  const prevOutputDataRef = useRef<unknown>(null);
  useEffect(() => {
    // Only call if output data actually changed
    if (prevOutputDataRef.current === outputData) {
      return;
    }
    prevOutputDataRef.current = outputData;
    
    if (data.onDataChange && typeof data.onDataChange === 'function') {
      data.onDataChange(id, outputData);
    }
  }, [outputData, id, data]);

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
            <Input 
              placeholder="tim@hubspot.com" 
              value={fieldValues.defaultValue}
              onChange={(e) => setFieldValues((prev) => ({ ...prev, defaultValue: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Input name</Label>
            <Input 
              placeholder="email" 
              value={fieldValues.inputName}
              onChange={(e) => setFieldValues((prev) => ({ ...prev, inputName: e.target.value }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Show as user input</Label>
            <Switch 
              checked={fieldValues.showAsUserInput}
              onCheckedChange={(checked) => setFieldValues((prev) => ({ ...prev, showAsUserInput: checked }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input 
              placeholder="The email of the new user." 
              value={fieldValues.description}
              onChange={(e) => setFieldValues((prev) => ({ ...prev, description: e.target.value }))}
            />
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

function AskAINode({ data, id }: NodeProps) {
  const { getEdges, getNodes } = useReactFlow();
  const [fieldValues, setFieldValues] = useState<{
    prompt: string;
    context: string;
  }>(data.fields || {
    prompt: '',
    context: '',
  });

  // Get incoming data from connected nodes
  const incomingData = useMemo(() => {
    const edges = getEdges();
    const nodes = getNodes();
    const incomingEdges = edges.filter(edge => edge.target === id);
    
    const dataMap: Record<string, string> = {};
    incomingEdges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      if (sourceNode?.data?.outputData) {
        // Map data based on handle ID
        if (edge.targetHandle === 'prompt') {
          const sourceData = sourceNode.data.outputData;
          dataMap.prompt = typeof sourceData === 'string' ? sourceData : (sourceData.value || JSON.stringify(sourceData));
        } else if (edge.targetHandle === 'context') {
          const sourceData = sourceNode.data.outputData;
          dataMap.context = typeof sourceData === 'string' ? sourceData : (sourceData.value || JSON.stringify(sourceData));
        }
      }
    });
    return dataMap;
  }, [getEdges, getNodes, id]);

  // Update field values when incoming data changes
  useEffect(() => {
    if (incomingData.prompt !== undefined) {
      setFieldValues((prev: { prompt: string; context: string }) => ({ ...prev, prompt: incomingData.prompt }));
    }
    if (incomingData.context !== undefined) {
      setFieldValues((prev: { prompt: string; context: string }) => ({ ...prev, context: incomingData.context }));
    }
  }, [incomingData]);

  // Get output data from this node
  const outputData = useMemo(() => {
    return {
      response: `AI Response for: ${fieldValues.prompt}`,
      prompt: fieldValues.prompt,
      context: fieldValues.context,
    };
  }, [fieldValues]);

  // Update data when field values change - use ref to prevent infinite loops
  const prevOutputDataRef = useRef<unknown>(null);
  useEffect(() => {
    // Only call if output data actually changed
    if (prevOutputDataRef.current === outputData) {
      return;
    }
    prevOutputDataRef.current = outputData;
    
    if (data.onDataChange && typeof data.onDataChange === 'function') {
      data.onDataChange(id, outputData);
    }
  }, [outputData, id, data]);

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
        {incomingData.prompt !== undefined && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            Connected: Prompt from previous node
          </div>
        )}
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Textarea 
            placeholder="Summarize the article in the context" 
            value={fieldValues.prompt}
            onChange={(e) => setFieldValues((prev) => ({ ...prev, prompt: e.target.value }))}
          />
        </div>
        {incomingData.context !== undefined && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            Connected: Context from previous node
          </div>
        )}
        <div className="space-y-2">
          <Label>Context</Label>
          <Textarea 
            placeholder="(Optional) This is additional context for the AI model that can be referenced in the prompt" 
            value={fieldValues.context}
            onChange={(e) => setFieldValues((prev) => ({ ...prev, context: e.target.value }))}
          />
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

function ExtractDataNode({ data, id }: NodeProps) {
  const { getEdges, getNodes } = useReactFlow();
  const [fieldValues, setFieldValues] = useState<{
    extractList: boolean;
    data: string;
    additionalContext: string;
  }>(data.fields || {
    extractList: false,
    data: '',
    additionalContext: '',
  });

  // Get incoming data from connected nodes
  const incomingData = useMemo(() => {
    const edges = getEdges();
    const nodes = getNodes();
    const incomingEdges = edges.filter(edge => edge.target === id);
    
    if (incomingEdges.length > 0) {
      const sourceNode = nodes.find(n => n.id === incomingEdges[0].source);
      return sourceNode?.data?.outputData || null;
    }
    return null;
  }, [getEdges, getNodes, id]);

  // Update field values when incoming data changes
  useEffect(() => {
    if (incomingData) {
      setFieldValues((prev: { extractList: boolean; data: string; additionalContext: string }) => ({ 
        ...prev, 
        data: typeof incomingData === 'string' ? incomingData : JSON.stringify(incomingData)
      }));
    }
  }, [incomingData]);

  // Get output data from this node
  const outputData = useMemo(() => {
    return {
      extracted: fieldValues.data,
      isList: fieldValues.extractList,
      context: fieldValues.additionalContext,
    };
  }, [fieldValues]);

  // Update data when field values change - use ref to prevent infinite loops
  const prevOutputDataRef = useRef<unknown>(null);
  useEffect(() => {
    // Only call if output data actually changed
    if (prevOutputDataRef.current === outputData) {
      return;
    }
    prevOutputDataRef.current = outputData;
    
    if (data.onDataChange && typeof data.onDataChange === 'function') {
      data.onDataChange(id, outputData);
    }
  }, [outputData, id, data]);

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
        {incomingData && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            Connected: Data from previous node
          </div>
        )}
        <div className="flex items-center justify-between">
          <Label>Extract List?</Label>
          <Switch 
            checked={fieldValues.extractList}
            onCheckedChange={(checked) => setFieldValues((prev) => ({ ...prev, extractList: checked }))}
          />
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
          <Input 
            placeholder="(Optional) - The item that I am extracting for a different editor" 
            value={fieldValues.additionalContext}
            onChange={(e) => setFieldValues((prev) => ({ ...prev, additionalContext: e.target.value }))}
          />
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

// IntegrationNode removed - integration nodes should use ConfigNode with nodeConfigs

// Generic node wrapper that uses BaseNode for config-based nodes
function ConfigNode(props: NodeProps) {
  const config = nodeConfigs[props.data.nodeType as keyof typeof nodeConfigs];
  if (!config) {
    return null;
  }
  return <BaseNode {...props} config={config} />;
}

// Node types definition
const nodeTypes = {
  flowBasics: FlowBasicsNode,
  askAI: AskAINode,
  extractData: ExtractDataNode,
  websiteScraper: ConfigNode,
  websiteCrawler: ConfigNode,
  webAgentScraper: ConfigNode,
  aiWebBrowser: ConfigNode,
  combineText: ConfigNode,
  textFormatter: ConfigNode,
  findReplace: ConfigNode,
  splitText: ConfigNode,
  chunkText: ConfigNode,
  categorizer: ConfigNode,
  summarizer: ConfigNode,
  scorer: ConfigNode,
  imageGeneration: ConfigNode,
  imageModelSelector: ConfigNode,
  videoGeneration: ConfigNode,
  videoModelSelector: ConfigNode,
  imageModel: ConfigNode,
  videoModel: ConfigNode,
  loraModel: ConfigNode,
  audioModel: ConfigNode,
  textEncoder: ConfigNode,
  gmail: GmailNode,
  googleDrive: ConfigNode,
  dropbox: ConfigNode,
  iCloud: ConfigNode,
  googleSheetsReader: ConfigNode,
  googleSheetsWriter: ConfigNode,
}

// Initial nodes
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'flowBasics',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Flow Basics',
      fields: {
        defaultValue: '',
        inputName: '',
        showAsUserInput: false,
        description: '',
      },
      outputData: null,
    },
  },
]

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedTab, setSelectedTab] = useState('nodes')
  const nodeDataMapRef = useRef<Record<string, unknown>>({})
  const handleDataChangeRef = useRef<((nodeId: string, outputData: unknown) => void) | undefined>(undefined)

  // Handle data changes from nodes - use ref to avoid recreating function
  const handleDataChange = useCallback((nodeId: string, outputData: unknown) => {
    // Only update if data actually changed
    if (nodeDataMapRef.current[nodeId] === outputData) {
      return;
    }
    nodeDataMapRef.current[nodeId] = outputData;
    
    // Update nodes with new data, but only the specific node
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id !== nodeId) {
          return node;
        }
        // Only update if data actually changed
        if (node.data.outputData === outputData) {
          return node;
        }
        return {
          ...node,
          data: {
            ...node.data,
            outputData: outputData,
          }
        };
      });
    });
  }, [setNodes]);

  // Store ref for stable access
  handleDataChangeRef.current = handleDataChange;

  // Initialize nodes with data change handler - only once on mount
  const nodesInitializedRef = useRef(false);
  useEffect(() => {
    if (nodesInitializedRef.current) return;
    nodesInitializedRef.current = true;
    
    setNodes((nds) => {
      return nds.map((node) => {
        // Only update if handler is missing
        if (node.data.onDataChange) {
          return node;
        }
        return {
          ...node,
          data: {
            ...node.data,
            onDataChange: handleDataChange,
            outputData: nodeDataMapRef.current[node.id] || node.data.outputData,
          }
        };
      });
    });
  }, [setNodes, handleDataChange]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  )

  const onAddNode = useCallback((type: string) => {
    const config = nodeConfigs[type as keyof typeof nodeConfigs];
    if (!config) {
      console.warn(`No config found for node type: ${type}`);
      return;
    }
    
    const newNode: Node = {
      id: `${type}_${Date.now()}`,
      type,
      position: { 
        x: Math.random() * 500, 
        y: Math.random() * 500 
      },
      data: { 
        nodeType: type,
        label: config.title,
        description: config.description,
        fields: config.fields,
        icon: config.icon,
        category: config.category,
        onDataChange: handleDataChange,
        outputData: null,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes, handleDataChange]);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-[400px] border-r bg-background flex-shrink-0">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full flex flex-col">
          <div className="border-b flex-shrink-0">
            <TabsList className="w-full justify-start rounded-none border-b px-4 h-14">
              <TabsTrigger value="nodes" className="relative px-4 data-[state=active]:bg-transparent">
                Node Library
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary data-[state=active]:block hidden" />
              </TabsTrigger>
              <TabsTrigger value="assets" className="relative px-4 data-[state=active]:bg-transparent">
                Assets
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary data-[state=active]:block hidden" />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="nodes" className="mt-0 flex-1 overflow-auto">
            <NodeLibrary onAddNode={onAddNode} />
          </TabsContent>
          <TabsContent value="assets" className="mt-0 flex-1 overflow-auto">
            <AssetsLibrary />
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Toolbar */}
        <div className="h-14 border-b flex items-center justify-between px-4 flex-shrink-0">
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
        <div className="flex-1 min-h-0 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className="w-full h-full"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}