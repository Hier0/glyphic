import { ReactNode } from 'react';

export interface IntegrationConfig {
  name: string;
  description: string;
  icon: ReactNode;
  category: 'api' | 'database' | 'messaging' | 'storage' | 'other';
  authType: 'oauth' | 'apiKey' | 'basic';
  documentationUrl?: string;
}

export interface IntegrationsState {
  [key: string]: {
    isConnected: boolean;
    credentials?: any; // Store encrypted/secure credentials
    lastConnected?: Date;
  };
} 