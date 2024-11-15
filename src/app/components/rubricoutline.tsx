import React, { useState, useEffect } from 'react';
import { Plus, X, ChevronRight, ChevronDown, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface Question {
  id: number;
  title: string;
  points: number;
  subQuestions: Question[];
}

interface RubricOutlineProps {
  title: string;
  initialPoints?: number;
}

const RubricOutline: React.FC<RubricOutlineProps> = ({ title, initialPoints = 1 }) => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: 'Calculus', points: 1, subQuestions: [
      { id: 11, title: 'What is the integral of x?', points: 3, subQuestions: [] },
      { id: 12, title: 'What is the derivative of cos x?', points: 3, subQuestions: [] }
    ] }
  ]);
  const [totalPoints, setTotalPoints] = useState<number>(initialPoints);
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([1]);

  useEffect(() => {
    const calculateTotalPoints = (qs: Question[]): number =>
      qs.reduce((total, q) => total + q.points + calculateTotalPoints(q.subQuestions), 0);
    
    setTotalPoints(calculateTotalPoints(questions));
  }, [questions]);

  const addQuestion = (parentId: number | null = null): void => {
    const newQuestion: Question = {
      id: Date.now(),
      title: 'New question',
      points: 1,
      subQuestions: [],
    };

    const addQuestionRecursive = (qs: Question[], targetId: number): Question[] =>
      qs.map(q => q.id === targetId 
        ? { ...q, subQuestions: [...q.subQuestions, newQuestion] }
        : { ...q, subQuestions: addQuestionRecursive(q.subQuestions, targetId) });

    if (parentId === null) {
      setQuestions([...questions, newQuestion]);
    } else {
      setQuestions(addQuestionRecursive(questions, parentId));
    }

    if (parentId && !expandedQuestions.includes(parentId)) {
      setExpandedQuestions([...expandedQuestions, parentId]);
    }
  };

  const removeQuestion = (id: number): void => {
    const removeQuestionRecursive = (qs: Question[], targetId: number): Question[] =>
      qs.filter(q => q.id !== targetId).map(q => ({
        ...q,
        subQuestions: removeQuestionRecursive(q.subQuestions, targetId)
      }));

    setQuestions(removeQuestionRecursive(questions, id));
  };

  const updateQuestion = (id: number, field: keyof Question, value: string | number): void => {
    const updateQuestionRecursive = (qs: Question[]): Question[] =>
      qs.map(q => q.id === id 
        ? { ...q, [field]: value }
        : { ...q, subQuestions: updateQuestionRecursive(q.subQuestions) });

    setQuestions(updateQuestionRecursive(questions));
  };

  const toggleExpand = (id: number): void => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const renderQuestion = (question: Question, index: number, parentNumbers: number[] = []): JSX.Element => {
    const currentNumber = [...parentNumbers, index + 1].join('.');
    const depth = parentNumbers.length;
    
    return (
      <div key={question.id} className="group">
        <div className={`flex items-center gap-2 mb-2 ${depth > 0 ? 'ml-6' : ''}`}>
          <div className="flex items-center gap-1">
            {question.subQuestions.length > 0 && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => toggleExpand(question.id)}
              >
                {expandedQuestions.includes(question.id) ? 
                  <ChevronDown size={14} /> : 
                  <ChevronRight size={14} />
                }
              </Button>
            )}
            <span className="text-sm text-gray-500 w-6">{currentNumber}</span>
          </div>
          <Input
            value={question.title}
            onChange={(e) => updateQuestion(question.id, 'title', e.target.value)}
            className="flex-grow h-8 text-sm"
            placeholder="Enter question title"
          />
          <Input
            type="number"
            value={question.points}
            onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-sm text-right"
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-600" 
              onClick={() => removeQuestion(question.id)}
            >
              <X size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-green-600" 
              onClick={() => addQuestion(question.id)}
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
        {expandedQuestions.includes(question.id) && (
          <div className="ml-4">
            {question.subQuestions.map((sq, sqIndex) =>
              renderQuestion(sq, sqIndex, [...parentNumbers, index + 1])
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-xl font-semibold">Outline for {title}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Edit2 size={14} className="mr-2" /> Edit Name Region
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Edit2 size={14} className="mr-2" /> Edit ID Region
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">{totalPoints} point total</p>
        <p className="text-sm text-gray-500 mt-2">
          Create questions and subquestions via the + buttons below, or by dragging boxes on the template. 
          Reorder and indent questions by dragging them in the outline.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-3 px-2">
          <div className="w-12 text-sm text-gray-500">#</div>
          <div className="flex-grow text-sm text-gray-500">TITLE</div>
          <div className="w-16 text-right text-sm text-gray-500">POINTS</div>
          <div className="w-20"></div>
        </div>
        {questions.map((q, index) => renderQuestion(q, index))}
        <Button 
          onClick={() => addQuestion(null)} 
          variant="outline"
          className="mt-4 w-full text-sm border-dashed border-gray-300"
        >
          <Plus size={14} className="mr-2" /> new question
        </Button>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-6">
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Cancel</Button>
        <Button variant="default" className="bg-green-600 hover:bg-green-700">Save Outline</Button>
      </CardFooter>
    </Card>
  );
};

export default RubricOutline;