import { GitBranch, GitPullRequest, GitCommit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NodeType } from '../nodes'

interface GithubNodesProps {
  onAddNode: (type: NodeType) => void
}

export function GithubNodes({ onAddNode }: GithubNodesProps) {
  return (
    <>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('createPR')}
      >
        <GitPullRequest className="mr-2 h-4 w-4 text-gray-700" />
        <div className="text-left">
          <div className="font-medium">Create PR</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('createBranch')}
      >
        <GitBranch className="mr-2 h-4 w-4 text-gray-700" />
        <div className="text-left">
          <div className="font-medium">Create Branch</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="justify-start h-auto py-3 px-4 bg-gray-50"
        onClick={() => onAddNode('commitChanges')}
      >
        <GitCommit className="mr-2 h-4 w-4 text-gray-700" />
        <div className="text-left">
          <div className="font-medium">Commit Changes</div>
        </div>
      </Button>
    </>
  )
} 