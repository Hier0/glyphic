
import { NodeConfig } from '../nodes/types';
import { Button } from '@/components/ui/button';

interface NodeButtonProps {
  nodeType: string;
  config: NodeConfig;
  onAddNode: (nodeType: string) => void;
  variant?: keyof typeof variantStyles;
}

const variantStyles = {
  ai: {
    icon: 'text-pink-500',
    bg: 'bg-gray-50',
  },
  'web-scraping': {
    icon: 'text-yellow-700',
    bg: 'bg-gray-50',
  },
  text: {
    icon: 'text-orange-700',
    bg: 'bg-gray-50',
  },
  integration: {
    icon: 'text-blue-600',
    bg: 'bg-gray-50',
  },
};

export function NodeButton({ nodeType, config, onAddNode, variant = 'ai' }: NodeButtonProps) {
  const styles = variantStyles[variant] || variantStyles.ai;
  const Icon = config.icon;

  return (
    <Button
      variant="ghost"
      className={`justify-start h-auto py-3 px-4 ${styles.bg}`}
      onClick={() => onAddNode(nodeType)}
    >
      <Icon className={`mr-2 h-4 w-4 ${styles.icon}`} />
      <div className="text-left">
        <div className="font-medium">{config.title}</div>
      </div>
    </Button>
  );
} 