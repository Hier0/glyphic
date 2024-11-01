import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings2, Globe } from 'lucide-react';

export interface BaseIntegrationProps {
  name: string;
  description: string;
  icon: ReactNode;
  category: 'api' | 'database' | 'messaging' | 'storage' | 'other';
  authType: 'oauth' | 'apiKey' | 'basic';
  documentationUrl?: string;
  isConnected?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onConfigure?: () => void;
}

const categoryStyles = {
  api: {
    header: 'bg-purple-50',
    icon: 'text-purple-600',
    description: 'bg-purple-50/50 text-purple-900',
  },
  database: {
    header: 'bg-blue-50',
    icon: 'text-blue-600',
    description: 'bg-blue-50/50 text-blue-900',
  },
  messaging: {
    header: 'bg-green-50',
    icon: 'text-green-600',
    description: 'bg-green-50/50 text-green-900',
  },
  storage: {
    header: 'bg-orange-50',
    icon: 'text-orange-600',
    description: 'bg-orange-50/50 text-orange-900',
  },
  other: {
    header: 'bg-gray-50',
    icon: 'text-gray-600',
    description: 'bg-gray-50/50 text-gray-900',
  },
};

export function BaseIntegration({ 
  name, 
  description, 
  icon, 
  category,
  authType,
  documentationUrl,
  isConnected = false,
  onConnect,
  onDisconnect,
  onConfigure
}: BaseIntegrationProps) {
  const styles = categoryStyles[category];

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className={`${styles.header} py-3`}>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <div className={`${styles.icon}`}>
            {icon}
          </div>
          {name}
          {documentationUrl && (
            <a 
              href={documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <p className={`text-sm rounded-lg p-2 ${styles.description}`}>
          {description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Auth: {authType}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isConnected ? "destructive" : "default"}
            size="sm"
            className="flex-1"
            onClick={isConnected ? onDisconnect : onConnect}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
          {isConnected && (
            <Button
              variant="outline"
              size="sm"
              onClick={onConfigure}
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 