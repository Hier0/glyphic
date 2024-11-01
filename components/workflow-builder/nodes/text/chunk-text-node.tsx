import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Input, Textarea } from '@/components/ui';
import { Layers, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function ChunkTextNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-orange-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Layers className="h-4 w-4 text-orange-700" />
          Chunk Text
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-orange-50/50 rounded-lg p-3 text-sm text-orange-900">
          Split text into chunks of specified size or pattern.
        </div>
        <div className="space-y-2">
          <Label>Chunk Size</Label>
          <Input placeholder="Number of characters or words per chunk" />
        </div>
        <div className="space-y-2">
          <Label>Text Input</Label>
          <Textarea placeholder="Enter or connect text to chunk" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 