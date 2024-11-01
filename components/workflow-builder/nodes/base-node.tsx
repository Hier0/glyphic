import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Input, Textarea, Switch } from '@/components/ui';
import { Maximize2, LucideIcon } from 'lucide-react';
import { NodeProps } from 'reactflow';

interface Field {
  type: 'input' | 'textarea' | 'switch';
  label: string;
  placeholder?: string;
}

interface NodeConfig {
  category: 'ai' | 'web-scraping' | 'text';
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
      <CardHeader className={styles.header}>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Icon className={`h-4 w-4 ${styles.icon}`} />
          {config.title}
          <Maximize2 className="h-4 w-4 ml-auto text-gray-500" />
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