import { Github, Database, MessageSquare, Cloud, Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import { IntegrationConfig } from './types';

export const integrationConfigs: Record<string, IntegrationConfig> = {
  github: {
    name: 'GitHub',
    description: 'Connect to GitHub repositories and actions',
    icon: <Github className="w-5 h-5 text-gray-700" />,
    category: 'api',
    authType: 'oauth',
    documentationUrl: 'https://docs.github.com/en/rest'
  },
  postgres: {
    name: 'PostgreSQL',
    description: 'Connect to PostgreSQL databases',
    icon: <Database className="w-5 h-5 text-gray-700" />,
    category: 'database',
    authType: 'basic'
  },
  slack: {
    name: 'Slack',
    description: 'Send messages and notifications to Slack',
    icon: <MessageSquare className="w-5 h-5 text-gray-700" />,
    category: 'messaging',
    authType: 'oauth',
    documentationUrl: 'https://api.slack.com/docs'
  },
  s3: {
    name: 'AWS S3',
    description: 'Store and retrieve files from S3',
    icon: <Cloud className="w-5 h-5 text-gray-700" />,
    category: 'storage',
    authType: 'apiKey'
  },
  customApi: {
    name: 'Custom API',
    description: 'Connect to any REST API endpoint',
    icon: <Globe className="w-5 h-5 text-gray-700" />,
    category: 'api',
    authType: 'apiKey'
  },
  discord: {
    name: 'Discord',
    description: 'Send messages and manage Discord servers',
    icon: <MessageCircle className="w-5 h-5 text-gray-700" />,
    category: 'messaging',
    authType: 'oauth',
    documentationUrl: 'https://discord.com/developers/docs/intro'
  },
  gmail: {
    name: 'Gmail',
    description: 'Send and manage emails through Gmail',
    icon: <Mail className="w-5 h-5 text-gray-700" />,
    category: 'messaging',
    authType: 'oauth',
    documentationUrl: 'https://developers.google.com/gmail/api'
  },
  outlook: {
    name: 'Outlook',
    description: 'Connect to Microsoft Outlook email services',
    icon: <Mail className="w-5 h-5 text-gray-700" />,
    category: 'messaging',
    authType: 'oauth',
    documentationUrl: 'https://docs.microsoft.com/en-us/outlook/rest/'
  },
  twilio: {
    name: 'Twilio',
    description: 'Send SMS, voice calls, and WhatsApp messages',
    icon: <Phone className="w-5 h-5 text-gray-700" />,
    category: 'messaging',
    authType: 'apiKey',
    documentationUrl: 'https://www.twilio.com/docs/api'
  }
}; 