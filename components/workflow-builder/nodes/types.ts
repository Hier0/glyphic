import { LucideIcon } from 'lucide-react';

export interface Field {
  type: 'input' | 'textarea' | 'switch';
  label: string;
  placeholder?: string;
}

export interface NodeConfig {
  category: 'ai' | 'web-scraping' | 'text'|'integration';
  title: string;
  description: string;
  icon: LucideIcon;
  fields: Field[];
} 