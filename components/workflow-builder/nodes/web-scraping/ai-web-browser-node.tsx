import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Textarea } from '@/components/ui';
import { Bot, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function AIWebBrowserNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-yellow-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Bot className="h-4 w-4 text-yellow-700" />
          AI Web Browser
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-yellow-50/50 rounded-lg p-3 text-sm text-yellow-900">
          Browse websites autonomously using AI to find and extract information.
        </div>
        <div className="space-y-2">
          <Label>Task Description</Label>
          <Textarea placeholder="Describe what information to find and collect" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 