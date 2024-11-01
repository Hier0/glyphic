import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Switch } from '@/components/ui';
import { Settings, HelpCircle } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function FlowBasicsNode({ data }: NodeProps) {
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
    </Card>
  );
} 