import { MessageCircle, Users, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NodeType } from '../nodes'

interface SMSNodesProps {
  onAddNode: (type: NodeType) => void
}

export function SMSNodes({ onAddNode }: SMSNodesProps) {
  return (
    <>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('sendSMS')}
      >
        <MessageCircle className="mr-2 h-4 w-4 text-green-700" />
        <div className="text-left">
          <div className="font-medium">Send SMS</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('bulkSMS')}
      >
        <Users className="mr-2 h-4 w-4 text-green-700" />
        <div className="text-left">
          <div className="font-medium">Bulk SMS</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('receiveSMS')}
      >
        <Phone className="mr-2 h-4 w-4 text-green-700" />
        <div className="text-left">
          <div className="font-medium">Receive SMS</div>
        </div>
      </Button>
    </>
  )
} 