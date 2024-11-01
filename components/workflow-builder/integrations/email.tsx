import { Mail, MailPlus, MailSearch } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NodeType } from '../nodes'

interface EmailNodesProps {
  onAddNode: (type: NodeType) => void
}

export function EmailNodes({ onAddNode }: EmailNodesProps) {
  return (
    <>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('sendEmail')}
      >
        <Mail className="mr-2 h-4 w-4 text-blue-700" />
        <div className="text-left">
          <div className="font-medium">Send Email</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('readEmails')}
      >
        <MailSearch className="mr-2 h-4 w-4 text-blue-700" />
        <div className="text-left">
          <div className="font-medium">Read Emails</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('createDraft')}
      >
        <MailPlus className="mr-2 h-4 w-4 text-blue-700" />
        <div className="text-left">
          <div className="font-medium">Create Draft</div>
        </div>
      </Button>
    </>
  )
} 