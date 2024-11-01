import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Input, Textarea } from '@/components/ui';
import { RefreshCw, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function FindReplaceNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-orange-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <RefreshCw className="h-4 w-4 text-orange-700" />
          Find and Replace
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-orange-50/50 rounded-lg p-3 text-sm text-orange-900">
          Find and replace text patterns using regex or simple matches.
        </div>
        <div className="space-y-2">
          <Label>Find Pattern</Label>
          <Input placeholder="Text or regex pattern to find" />
        </div>
        <div className="space-y-2">
          <Label>Replace With</Label>
          <Input placeholder="Replacement text" />
        </div>
        <div className="space-y-2">
          <Label>Text Input</Label>
          <Textarea placeholder="Enter or connect text to process" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 