import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Maximize2, LucideIcon, Link2, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { NodeProps, Handle, Position, useReactFlow } from 'reactflow';
import { Field, NodeConfig } from './types';

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

export function BaseNode({ data, config, id }: NodeProps & { config: NodeConfig }) {
  const { getEdges, getNodes } = useReactFlow();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const styles = categoryStyles[config.category];
  const Icon = config.icon;

  // Initialize field values from data or defaults
  const initialFieldValues = useMemo(() => {
    const values: Record<string, string | boolean> = {};
    config.fields.forEach(field => {
      const fieldKey = field.label.toLowerCase().replace(/\s+/g, '');
      if (data.fields && data.fields[fieldKey] !== undefined) {
        values[fieldKey] = data.fields[fieldKey];
      } else if (field.type === 'switch') {
        values[fieldKey] = false;
      } else {
        values[fieldKey] = '';
      }
    });
    return values;
  }, [config.fields, data.fields]);

  const [fieldValues, setFieldValues] = useState<Record<string, string | boolean>>(initialFieldValues);

  // Get incoming data from connected nodes
  const incomingData = useMemo(() => {
    const edges = getEdges();
    const nodes = getNodes();
    const incomingEdges = edges.filter(edge => edge.target === id);
    
    if (incomingEdges.length > 0) {
      const sourceNode = nodes.find(n => n.id === incomingEdges[0].source);
      return sourceNode?.data?.outputData || null;
    }
    return null;
  }, [getEdges, getNodes, id]);

  // Update field values when incoming data changes (use first text field)
  useEffect(() => {
    if (incomingData) {
      const firstTextField = config.fields.find(f => f.type === 'input' || f.type === 'textarea');
      if (firstTextField) {
        const fieldKey = firstTextField.label.toLowerCase().replace(/\s+/g, '');
        const dataValue = typeof incomingData === 'string' ? incomingData : 
          (typeof incomingData === 'object' && incomingData !== null ? 
            (incomingData.value || JSON.stringify(incomingData)) : '');
        setFieldValues(prev => ({ ...prev, [fieldKey]: dataValue }));
      }
    }
  }, [incomingData, config.fields]);

  // Get output data from this node
  const outputData = useMemo(() => {
    // Return the first text field value or all field values
    const firstTextField = config.fields.find(f => f.type === 'input' || f.type === 'textarea');
    if (firstTextField) {
      const fieldKey = firstTextField.label.toLowerCase().replace(/\s+/g, '');
      return fieldValues[fieldKey] || '';
    }
    return fieldValues;
  }, [fieldValues, config.fields]);

  // Update data when field values change - use ref to prevent infinite loops
  const prevOutputDataRef = useRef<unknown>(null);
  useEffect(() => {
    // Only call if output data actually changed
    if (prevOutputDataRef.current === outputData) {
      return;
    }
    prevOutputDataRef.current = outputData;
    
    if (data.onDataChange && typeof data.onDataChange === 'function') {
      data.onDataChange(id || '', outputData);
    }
  }, [outputData, id, data]);

  // Split fields into basic and advanced
  const basicFields = config.fields.filter(field => !field.advanced);
  const advancedFields = config.fields.filter(field => field.advanced);
  const hasAdvancedFields = advancedFields.length > 0;

  const renderField = (field: Field, index: number) => {
    const fieldKey = field.label.toLowerCase().replace(/\s+/g, '');
    const value = fieldValues[fieldKey] || '';
    const hasIncomingData = incomingData && (
      field === config.fields.find(f => f.type === 'input' || f.type === 'textarea')
    );

    switch (field.type) {
      case 'input':
        return (
          <div key={index} className="space-y-2">
            {hasIncomingData && (
              <div className="text-xs text-gray-500 bg-gray-50 p-1 rounded">
                Connected: Data from previous node
              </div>
            )}
            <Label>{field.label}</Label>
            <Input 
              placeholder={field.placeholder} 
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => setFieldValues(prev => ({ ...prev, [fieldKey]: e.target.value }))}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={index} className="space-y-2">
            {hasIncomingData && (
              <div className="text-xs text-gray-500 bg-gray-50 p-1 rounded">
                Connected: Data from previous node
              </div>
            )}
            <Label>{field.label}</Label>
            <Textarea 
              placeholder={field.placeholder}
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => setFieldValues(prev => ({ ...prev, [fieldKey]: e.target.value }))}
            />
          </div>
        );
      case 'switch':
        return (
          <div key={index} className="flex items-center justify-between">
            <Label>{field.label}</Label>
            <Switch 
              checked={typeof value === 'boolean' ? value : false}
              onCheckedChange={(checked) => setFieldValues(prev => ({ ...prev, [fieldKey]: checked }))}
            />
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
        
        {/* Basic fields - always visible */}
        {basicFields.map((field, index) => renderField(field, index))}
        
        {/* Advanced fields - shown when toggle is on */}
        {hasAdvancedFields && showAdvanced && (
          <div className="space-y-4 pt-2 border-t">
            {advancedFields.map((field, index) => renderField(field, index))}
          </div>
        )}
        
        {/* Toggle button for advanced options */}
        {hasAdvancedFields && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Fewer Options
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show More Options
              </>
            )}
          </Button>
        )}
      </CardContent>
      
      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-300 border-2 border-white rounded-full"
        style={{ top: '-12px' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-300 border-2 border-white rounded-full"
        style={{ bottom: '-12px' }}
      />
    </Card>
  );
} 