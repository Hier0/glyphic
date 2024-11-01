import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Input, Textarea } from '@/components/ui';
import { Link, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function CombineTextNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-orange-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Link className="h-4 w-4 text-orange-700" />
          Combine Text
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-orange-50/50 rounded-lg p-3 text-sm text-orange-900">
          Combine multiple text inputs with custom separators.
        </div>
        <div className="space-y-2">
          <Label>Separator</Label>
          <Input placeholder="Space, newline, or custom text" />
        </div>
        <div className="space-y-2">
          <Label>Text Inputs</Label>
          <Textarea placeholder="Connect multiple text inputs to combine" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 