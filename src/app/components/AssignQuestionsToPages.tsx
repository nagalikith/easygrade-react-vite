import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  points: number;
}

interface Section {
  id: string;
  title: string;
  points: number;
  questions: Question[];
}

interface PageAssignment {
  id: string;
  questions: Question[];
}

// Draggable Question Item Component
const DraggableQuestion = ({ question }: { question: Question }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'question',
    item: question,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
        flex justify-between items-center p-2 rounded-md cursor-move mb-1
        ${isDragging ? 'opacity-50' : 'hover:bg-gray-100'}
      `}
    >
      <span className="text-sm">{question.title}</span>
      <span className="text-sm text-gray-500">{question.points} pts</span>
    </div>
  );
};

// Droppable Page Component
const DroppablePage = ({ 
  pageId, 
  questions,
  onDrop,
  onRemoveQuestion 
}: { 
  pageId: string;
  questions: Question[];
  onDrop: (questionId: Question) => void;
  onRemoveQuestion: (questionId: string) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'question',
    drop: (item: Question) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Card className="p-4 relative">
      <div className="absolute top-2 right-2">
        <Button variant="ghost" size="icon" className="h-6 w-6">
          ×
        </Button>
      </div>
      <div
        ref={drop}
        className={`
          h-[300px] border-2 border-dashed rounded-md
          ${isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}
          flex flex-col
        `}
      >
        {questions.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">
              <div className="w-48 h-32 mx-auto mb-4 border-2 border-gray-200 rounded-md" />
              <p className="text-sm text-gray-500">Drop questions here</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {questions.map((question) => (
              <div
                key={question.id}
                className="flex justify-between items-center p-2 bg-emerald-100 rounded-md"
              >
                <span className="text-sm">{question.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-emerald-200"
                  onClick={() => onRemoveQuestion(question.id)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="absolute bottom-4 left-4 flex gap-2">
        {questions.map((question) => (
          <span
            key={question.id}
            className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs"
          >
            Q{question.id}
          </span>
        ))}
      </div>
    </Card>
  );
};

const GroupAssignment = () => {
  const [pageAssignments, setPageAssignments] = useState<Record<string, Question[]>>({
    '1': [],
    '2': [],
  });

  // Sample data structure matching the image
  const sections: Section[] = [
    {
      id: '1',
      title: 'Calculus',
      points: 6.0,
      questions: [
        { id: '1.1', title: 'Integral of x', points: 3.0 },
        { id: '1.2', title: 'Derivative of x', points: 3.0 }
      ]
    },
    {
      id: '2',
      title: 'Geography',
      points: 2.0,
      questions: [{ id: '2.1', title: 'Find India', points: 2.0 }]
    },
    {
      id: '3',
      title: 'Chemistry',
      points: 4.0,
      questions: [
        { id: '3.1', title: 'Lewis Structure', points: 3.0 },
        { id: '3.2', title: 'Noble gases', points: 1.0 }
      ]
    }
  ];

  const handleDrop = (pageId: string, question: Question) => {
    setPageAssignments(prev => ({
      ...prev,
      [pageId]: [...prev[pageId], question]
    }));
  };

  const handleRemoveQuestion = (pageId: string, questionId: string) => {
    setPageAssignments(prev => ({
      ...prev,
      [pageId]: prev[pageId].filter(q => q.id !== questionId)
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-medium">Assign Questions and Pages</h2>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop questions to assign them to pages. Use the × button to remove assignments.
          </p>
        </div>

        <div className="flex gap-4">
          {/* Question Outline */}
          <Card className="w-1/3 p-4">
            <h3 className="font-medium mb-4">Question Outline</h3>
            <ScrollArea className="h-[500px] pr-4">
              {sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{section.id} {section.title}</span>
                    <span className="text-sm text-gray-500">{section.points} pts</span>
                  </div>
                  {section.questions.map((question) => (
                    <DraggableQuestion key={question.id} question={question} />
                  ))}
                </div>
              ))}
            </ScrollArea>
          </Card>

          {/* Preview Pages */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {Object.entries(pageAssignments).map(([pageId, questions]) => (
              <DroppablePage
                key={pageId}
                pageId={pageId}
                questions={questions}
                onDrop={(question) => handleDrop(pageId, question)}
                onRemoveQuestion={(questionId) => handleRemoveQuestion(pageId, questionId)}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default GroupAssignment;