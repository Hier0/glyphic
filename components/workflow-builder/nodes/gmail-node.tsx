import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Maximize2, Link2, Settings, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { NodeProps, Handle, Position } from 'reactflow';
import { Field } from './types';

const categoryStyles = {
  integration: {
    header: 'bg-blue-50',
    icon: 'text-blue-600',
    description: 'bg-blue-50/50 text-blue-900',
  },
};

interface GmailNodeProps extends NodeProps {
  data?: {
    nodeType?: string;
    label?: string;
    description?: string;
    fields?: Field[];
    icon?: any;
    category?: string;
  };
}

export function GmailNode({ data }: GmailNodeProps) {
  const [sendEmailMode, setSendEmailMode] = useState(true); // Default to Send Email mode
  const [showAdvanced, setShowAdvanced] = useState(false);
  const styles = categoryStyles.integration;

  // Send Email Fields
  const sendEmailBasicFields: Field[] = [
    {
      type: 'input',
      label: 'To',
      placeholder: 'recipient@example.com (your own email or others)'
    },
    {
      type: 'input',
      label: 'Subject',
      placeholder: 'Email subject line'
    },
    {
      type: 'textarea',
      label: 'Message Body',
      placeholder: 'Enter your email message content (or connect data to send)'
    }
  ];

  const sendEmailAdvancedFields: Field[] = [
    {
      type: 'input',
      label: 'CC',
      placeholder: 'cc@example.com (optional)'
    },
    {
      type: 'input',
      label: 'BCC',
      placeholder: 'bcc@example.com (optional)'
    },
    {
      type: 'input',
      label: 'Reply To',
      placeholder: 'reply-to@example.com (optional)'
    },
    {
      type: 'input',
      label: 'Attachments',
      placeholder: 'File paths or URLs (comma-separated). PDFs will be attached if connected.'
    },
    {
      type: 'switch',
      label: 'HTML Format'
    },
    {
      type: 'switch',
      label: 'Mark as Important'
    },
    {
      type: 'switch',
      label: 'Request Read Receipt'
    }
  ];

  // Read Email Fields
  const readEmailBasicFields: Field[] = [
    {
      type: 'input',
      label: 'Search Query',
      placeholder: 'from:sender@example.com OR subject:meeting'
    },
    {
      type: 'input',
      label: 'Max Results',
      placeholder: '10'
    },
    {
      type: 'input',
      label: 'Label/Folder',
      placeholder: 'INBOX, SENT, DRAFTS, or custom label'
    }
  ];

  const readEmailAdvancedFields: Field[] = [
    {
      type: 'input',
      label: 'From Sender',
      placeholder: 'sender@example.com'
    },
    {
      type: 'input',
      label: 'Date Range (Days)',
      placeholder: '7 (last 7 days)'
    },
    {
      type: 'switch',
      label: 'Unread Only'
    },
    {
      type: 'switch',
      label: 'Include Attachments'
    },
    {
      type: 'switch',
      label: 'Mark as Read'
    }
  ];

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

  const currentBasicFields = sendEmailMode ? sendEmailBasicFields : readEmailBasicFields;
  const currentAdvancedFields = sendEmailMode ? sendEmailAdvancedFields : readEmailAdvancedFields;
  const hasAdvancedFields = currentAdvancedFields.length > 0;

  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className={`${styles.header} pb-3`}>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Mail className={`h-4 w-4 ${styles.icon}`} />
          Gmail
          <Link2 className="h-4 w-4 ml-auto text-blue-500 hover:text-blue-600 cursor-pointer" />
          <Settings className="h-4 w-4 text-gray-500 hover:text-gray-600 cursor-pointer" />
          <Maximize2 className="h-4 w-4 text-gray-500 hover:text-gray-600 cursor-pointer" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className={`rounded-lg p-3 text-sm ${styles.description}`}>
          Send emails to your Gmail account or read emails from your Gmail inbox. Sends PDF or email based on connected data.
        </div>
        
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <Label>Connected to Gmail</Label>
          <Switch />
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="space-y-1">
            <Label>Send Email Mode</Label>
            <p className="text-xs text-gray-500">
              {sendEmailMode ? 'ON = Send email' : 'OFF = Read emails'}
            </p>
          </div>
          <Switch checked={sendEmailMode} onCheckedChange={setSendEmailMode} />
        </div>

        {/* Basic fields - shown based on mode */}
        <div className="space-y-4">
          {currentBasicFields.map((field, index) => renderField(field, index))}
        </div>
        
        {/* Advanced fields - shown when toggle is on */}
        {hasAdvancedFields && showAdvanced && (
          <div className="space-y-4 pt-2 border-t">
            {currentAdvancedFields.map((field, index) => renderField(field, index))}
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

