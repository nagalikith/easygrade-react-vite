import React from 'react';
import { format } from 'date-fns';
import { Grip, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Assignment {
  id: string;
  name: string;
  released: string;
  due: string;
}

interface AssignmentListProps {
  assignments: Assignment[];
  onAssignmentClick: (assignmentId: string) => void;
  onOrderChange: (newAssignments: Assignment[]) => void;
  sectionId: string;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  onAssignmentClick,
  onOrderChange,
  sectionId
}) => {
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a 'PDT'");
    } catch {
      return dateString;
    }
  };

  const isAssignmentActive = (assignment: Assignment) => {
    const now = new Date();
    const releaseDate = new Date(assignment.released);
    const dueDate = new Date(assignment.due);
    return now >= releaseDate && now <= dueDate;
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    const target = e.currentTarget;
    target.classList.add('opacity-50');

    // Delay adding the dragging class for visual feedback
    setTimeout(() => {
      target.classList.add('scale-105');
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newAssignments = [...assignments];
    const [removed] = newAssignments.splice(draggedItem, 1);
    newAssignments.splice(dropIndex, 0, removed);

    onOrderChange(newAssignments);
    setDraggedItem(null);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50', 'scale-105');
    setDraggedItem(null);
  };

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-600 p-4">
        <div className="col-span-2">ACTIVE ASSIGNMENTS</div>
        <div>RELEASED</div>
        <div>DUE (PDT)</div>
        <div>SUBMISSIONS</div>
        <div>% GRADED</div>
        <div>PUBLISHED</div>
      </div>

      {assignments.map((assignment, index) => (
        <div
          key={assignment.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className="grid grid-cols-7 gap-4 items-center bg-gray-50 p-4 rounded-lg
                     hover:bg-gray-100 transition-all duration-200 group
                     border border-transparent hover:border-gray-200"
        >
          <div className="col-span-2 flex items-center gap-3">
            <Grip className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 cursor-grab transition-opacity" />
            <div 
              onClick={() => onAssignmentClick(`${sectionId}/assignments/${assignment.id}`)}
              className="flex items-center gap-2 hover:text-green-600 cursor-pointer"
            >
              {assignment.name}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
              {isAssignmentActive(assignment) && (
                <Badge className="ml-2 bg-green-100 text-green-800">Active</Badge>
              )}
            </div>
          </div>
          <div className="text-gray-600 text-sm">{formatDate(assignment.released)}</div>
          <div className="text-gray-600 text-sm">{formatDate(assignment.due)}</div>
          <div className="text-gray-600 text-sm">-</div>
          <div className="text-gray-600 text-sm">-</div>
          <div className="text-gray-600 text-sm">✓</div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;