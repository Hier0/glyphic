import { LucideIcon } from 'lucide-react';

export interface Field {
  type: 'input' | 'textarea' | 'switch';
  label: string;
  placeholder?: string;
  advanced?: boolean; // If true, field is hidden by default and shown when "Show More Options" is toggled
}

export interface NodeConfig {
  category: 'ai' | 'web-scraping' | 'text'|'integration';
  title: string;
  description: string;
  icon: LucideIcon;
  fields: Field[];
} 