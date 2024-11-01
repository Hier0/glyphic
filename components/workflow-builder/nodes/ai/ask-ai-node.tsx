import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Textarea } from '@/components/ui';
import { Bot, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function AskAINode({ data }: NodeProps) {
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
    </Card>
  );
} 