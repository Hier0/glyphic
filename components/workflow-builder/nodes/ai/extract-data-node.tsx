import React from 'react';
import { Card, CardContent, Input, Label, Switch, Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function ExtractDataNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardContent className="bg-muted p-2 border-b">
        <h3 className="font-semibold">Extract Data</h3>
      </CardContent>

      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="field">Field to Extract</Label>
          <Input id="field" placeholder="Enter field name or path" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="default">Default Value</Label>
          <Input id="default" placeholder="Default value if field is not found" />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="strict" />
          <Label htmlFor="strict">Strict Mode</Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Additional Fields</Label>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Field
            </Button>
          </div>
        </div>
      </CardContent>

      <div className="p-2">
        <div className="flex justify-between space-x-4">
          <div className="h-3 w-3 rounded-full bg-blue-500 cursor-pointer" />
          <div className="h-3 w-3 rounded-full bg-green-500 cursor-pointer" />
        </div>
      </div>
    </Card>
  )
} 