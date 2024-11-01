import { MessageSquare, Bell, Hash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NodeType } from '../nodes'

interface SlackNodesProps {
  onAddNode: (type: NodeType) => void
}

export function SlackNodes({ onAddNode }: SlackNodesProps) {
  return (
    <>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('sendSlackMessage')}
      >
        <MessageSquare className="mr-2 h-4 w-4 text-purple-700" />
        <div className="text-left">
          <div className="font-medium">Send Message</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('slackNotification')}
      >
        <Bell className="mr-2 h-4 w-4 text-purple-700" />
        <div className="text-left">
          <div className="font-medium">Send Notification</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('createSlackChannel')}
      >
        <Hash className="mr-2 h-4 w-4 text-purple-700" />
        <div className="text-left">
          <div className="font-medium">Create Channel</div>
        </div>
      </Button>
    </>
  )
} 