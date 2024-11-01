import { MessageSquare, Hash, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NodeType } from '../nodes'

interface DiscordNodesProps {
  onAddNode: (type: NodeType) => void
}

export function DiscordNodes({ onAddNode }: DiscordNodesProps) {
  return (
    <>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('sendDiscordMessage')}
      >
        <MessageSquare className="mr-2 h-4 w-4 text-indigo-700" />
        <div className="text-left">
          <div className="font-medium">Send Message</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('createDiscordChannel')}
      >
        <Hash className="mr-2 h-4 w-4 text-indigo-700" />
        <div className="text-left">
          <div className="font-medium">Create Channel</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('manageRoles')}
      >
        <Users className="mr-2 h-4 w-4 text-indigo-700" />
        <div className="text-left">
          <div className="font-medium">Manage Roles</div>
        </div>
      </Button>
    </>
  )
} 