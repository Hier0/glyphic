import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Input } from '@/components/ui';
import { Download, Maximize2 } from 'lucide-react';
import { NodeProps } from 'reactflow';

export function WebsiteScraperNode({ data }: NodeProps) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="bg-yellow-50">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Download className="h-4 w-4 text-yellow-700" />
          Website Scraper
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-yellow-50/50 rounded-lg p-3 text-sm text-yellow-900">
          Extract data from websites using CSS selectors or XPath.
        </div>
        <div className="space-y-2">
          <Label>Website URL</Label>
          <Input placeholder="https://example.com" />
        </div>
        <div className="space-y-2">
          <Label>CSS Selector</Label>
          <Input placeholder=".article-content" />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 