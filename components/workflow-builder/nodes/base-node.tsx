import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Maximize2, LucideIcon, Link2, Settings } from 'lucide-react';
import { NodeProps } from 'reactflow';

interface Field {
  type: 'input' | 'textarea' | 'switch';
  label: string;
  placeholder?: string;
}

interface NodeConfig {
  category: 'ai' | 'web-scraping' | 'text' | 'integration';
  title: string;
  description: string;
  icon: LucideIcon;
  fields: Field[];
}

const categoryStyles = {
  ai: {
    header: 'bg-pink-50',
    icon: 'text-pink-500',
    description: 'bg-pink-50/50 text-pink-900',
  },
  'web-scraping': {
    header: 'bg-yellow-50',
    icon: 'text-yellow-700',
    description: 'bg-yellow-50/50 text-yellow-900',
  },
  text: {
    header: 'bg-orange-50',
    icon: 'text-orange-700',
    description: 'bg-orange-50/50 text-orange-900',
  },
  integration: {
    header: 'bg-blue-50',
    icon: 'text-blue-600',
    description: 'bg-blue-50/50 text-blue-900',
  },
};

export function BaseNode({ data, config }: NodeProps & { config: NodeConfig }) {
  const styles = categoryStyles[config.category];
  const Icon = config.icon;

  const renderField = (field: Field, index: number) => {
    switch (field.type) {
      case 'input':
        return (
          <div key={index} className="space-y-2">
            <Label>{field.label}</Label>
            <Input placeholder={field.placeholder} />
          </div>
        );
      case 'textarea':
        return (
          <div key={index} className="space-y-2">
            <Label>{field.label}</Label>
            <Textarea placeholder={field.placeholder} />
          </div>
        );
      case 'switch':
        return (
          <div key={index} className="flex items-center justify-between">
            <Label>{field.label}</Label>
            <Switch />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className={`${styles.header} pb-3`}>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Icon className={`h-4 w-4 ${styles.icon}`} />
          {config.title}
          {config.category === 'integration' && (
            <>
              <Link2 className="h-4 w-4 ml-auto text-blue-500 hover:text-blue-600 cursor-pointer" />
              <Settings className="h-4 w-4 text-gray-500 hover:text-gray-600 cursor-pointer" />
              <Maximize2 className="h-4 w-4 text-gray-500 hover:text-gray-600 cursor-pointer" />
            </>
          )}
          {config.category !== 'integration' && (
            <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className={`rounded-lg p-3 text-sm ${styles.description}`}>
          {config.description}
        </div>
        {config.fields.map((field, index) => renderField(field, index))}
        <Button variant="outline" size="sm" className="w-full">
          Show More Options
        </Button>
      </CardContent>
    </Card>
  );
} 