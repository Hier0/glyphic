import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Textarea, Input } from '@/components/ui';
import { LayoutGrid, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export default function CategorizerNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-pink-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <LayoutGrid className="h-4 w-4 text-pink-500" />
          Categorizer
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-pink-50/50 rounded-lg p-3 text-sm text-pink-900">
          Categorize text into predefined or AI-generated categories.
        </div>
        <div className="space-y-2">
          <Label>Text to Categorize</Label>
          <Textarea placeholder="Enter or connect text to categorize" />
        </div>
        <div className="space-y-2">
          <Label>Categories</Label>
          <Input placeholder="Enter categories separated by commas" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 