import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Textarea, Input } from '@/components/ui';
import { Circle, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export default function ScorerNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-pink-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Circle className="h-4 w-4 text-pink-500" />
          Scorer
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-pink-50/50 rounded-lg p-3 text-sm text-pink-900">
          Score text based on custom criteria using AI.
        </div>
        <div className="space-y-2">
          <Label>Text to Score</Label>
          <Textarea placeholder="Enter or connect text to score" />
        </div>
        <div className="space-y-2">
          <Label>Scoring Criteria</Label>
          <Input placeholder="Define scoring criteria" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 