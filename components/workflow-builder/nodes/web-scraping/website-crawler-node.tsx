import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Input, Switch } from '@/components/ui';
import { LayoutGrid, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function WebsiteCrawlerNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-yellow-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <LayoutGrid className="h-4 w-4 text-yellow-700" />
          Website Crawler
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-yellow-50/50 rounded-lg p-3 text-sm text-yellow-900">
          Crawl websites and extract data from multiple pages automatically.
        </div>
        <div className="space-y-2">
          <Label>Start URL</Label>
          <Input placeholder="https://example.com" />
        </div>
        <div className="space-y-2">
          <Label>URL Pattern</Label>
          <Input placeholder="*/blog/*" />
        </div>
        <div className="flex items-center justify-between">
          <Label>Respect robots.txt</Label>
          <Switch />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 