import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Textarea } from '@/components/ui';
import { FileText, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function SummarizerNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-pink-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <FileText className="h-4 w-4 text-pink-500" />
          Summarizer
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-pink-50/50 rounded-lg p-3 text-sm text-pink-900">
          Summarize text content using AI. Control length and style of summaries.
        </div>
        <div className="space-y-2">
          <Label>Text to Summarize</Label>
          <Textarea placeholder="Enter or connect text to summarize" />
        </div>
        <div className="space-y-2">
          <Label>Summary Length</Label>
          <Textarea placeholder="Short, medium, or long" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 