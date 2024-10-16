import React, { useState, useEffect } from 'react';
import { Plus, X, ChevronRight, ChevronDown } from 'lucide-react';
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

const RubricOutline: React.FC<RubricOutlineProps> = ({ title, initialPoints = 2 }) => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: 'Chapter 1 ex 3', points: 1, subQuestions: [] },
    { id: 2, title: 'Chapter 1 ex 7', points: 1, subQuestions: [
      { id: 21, title: 'Subquestion title', points: 1, subQuestions: [] }
    ] },
  ]);
  const [totalPoints, setTotalPoints] = useState<number>(initialPoints);
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([2]);

  useEffect(() => {
    const calculateTotalPoints = (qs: Question[]): number => {
      return qs.reduce((total, q) => {
        return total + q.points + calculateTotalPoints(q.subQuestions);
      }, 0);
    };
    setTotalPoints(calculateTotalPoints(questions));
  }, [questions]);

  const addQuestion = (parentId: number | null = null, level: number = 0): void => {
    const newQuestion: Question = {
      id: Date.now(),
      title: 'Question title',
      points: 1,
      subQuestions: [],
    };

    const addQuestionRecursive = (qs: Question[], targetId: number, currentLevel: number): Question[] => {
      return qs.map(q => {
        if (q.id === targetId) {
          return { ...q, subQuestions: [...q.subQuestions, newQuestion] };
        }
        if (q.subQuestions.length > 0) {
          return { ...q, subQuestions: addQuestionRecursive(q.subQuestions, targetId, currentLevel + 1) };
        }
        return q;
      });
    };

    if (parentId === null) {
      setQuestions([...questions, newQuestion]);
    } else {
      setQuestions(addQuestionRecursive(questions, parentId, 0));
    }

    if (parentId && !expandedQuestions.includes(parentId)) {
      setExpandedQuestions([...expandedQuestions, parentId]);
    }
  };

  const removeQuestion = (id: number): void => {
    const removeQuestionRecursive = (qs: Question[], targetId: number): Question[] => {
      return qs.filter(q => q.id !== targetId).map(q => {
        if (q.subQuestions.length > 0) {
          return { ...q, subQuestions: removeQuestionRecursive(q.subQuestions, targetId) };
        }
        return q;
      });
    };

    setQuestions(removeQuestionRecursive(questions, id));
  };

  const updateQuestion = (id: number, field: keyof Question, value: string | number): void => {
    const updateQuestionRecursive = (qs: Question[]): Question[] => {
      return qs.map(q => {
        if (q.id === id) {
          return { ...q, [field]: value };
        }
        if (q.subQuestions.length > 0) {
          return { ...q, subQuestions: updateQuestionRecursive(q.subQuestions) };
        }
        return q;
      });
    };

    setQuestions(updateQuestionRecursive(questions));
  };

  const toggleExpand = (id: number): void => {
    setExpandedQuestions(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const renderQuestion = (question: Question, index: number, parentNumbers: number[] = []): JSX.Element => {
    const currentNumber = [...parentNumbers, index + 1].join('.');
    return (
      <React.Fragment key={question.id}>
        <div className={`flex items-center gap-2 mb-2 ml-${parentNumbers.length * 4}`}>
          {question.subQuestions.length > 0 && (
            <Button variant="ghost" size="icon" onClick={() => toggleExpand(question.id)}>
              {expandedQuestions.includes(question.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </Button>
          )}
          {question.subQuestions.length === 0 && <div className="w-8"></div>}
          <div className="w-12 text-gray-500">{currentNumber}</div>
          <Input
            value={question.title}
            onChange={(e) => updateQuestion(question.id, 'title', e.target.value)}
            className="flex-grow"
          />
          <Input
            type="number"
            value={question.points}
            onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 0)}
            className="w-16 text-right"
          />
          <Button variant="ghost" size="icon" onClick={() => removeQuestion(question.id)}>
            <X size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => addQuestion(question.id, parentNumbers.length + 1)}>
            <Plus size={16} />
          </Button>
        </div>
        {expandedQuestions.includes(question.id) && question.subQuestions.map((sq, sqIndex) => 
          renderQuestion(sq, sqIndex, [...parentNumbers, index + 1])
        )}
      </React.Fragment>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Outline for {title}</h2>
        <p>{totalPoints} points total</p>
        <p className="text-sm text-gray-500">
          Create questions and subquestions via the + buttons below. Reorder and indent questions by dragging them in the outline.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2 font-bold">
          <div className="w-12">#</div>
          <div className="flex-grow">TITLE</div>
          <div className="w-16 text-right">POINTS</div>
          <div className="w-16"></div>
        </div>
        {questions.map((q, index) => renderQuestion(q, index))}
        <Button onClick={() => addQuestion(null)} className="mt-4 w-full">
          <Plus size={16} className="mr-2" /> new question
        </Button>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="destructive">Cancel</Button>
        <Button variant="default">Save Outline</Button>
      </CardFooter>
    </Card>
  );
};

export default RubricOutline;