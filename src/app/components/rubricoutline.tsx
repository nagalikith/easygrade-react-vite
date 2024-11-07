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
    const calculateTotalPoints = (qs: Question[]): number =>
      qs.reduce((total, q) => total + q.points + calculateTotalPoints(q.subQuestions), 0);
    
    setTotalPoints(calculateTotalPoints(questions));
  }, [questions]);

  const addQuestion = (parentId: number | null = null): void => {
    const newQuestion: Question = {
      id: Date.now(),
      title: 'Question title',
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
    
    return (
      <React.Fragment key={question.id}>
        <div className={`flex items-center gap-2 mb-2 ml-${parentNumbers.length * 4}`}>
          {question.subQuestions.length > 0 && (
            <Button variant="ghost" size="icon" onClick={() => toggleExpand(question.id)}>
              {expandedQuestions.includes(question.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </Button>
          )}
          <div className="w-12 text-green-600">{currentNumber}</div>
          <Input
            value={question.title}
            onChange={(e) => updateQuestion(question.id, 'title', e.target.value)}
            className="flex-grow"
            placeholder="Enter question title"
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
          <Button variant="ghost" size="icon" onClick={() => addQuestion(question.id)}>
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
        <h2 className="text-2xl font-bold text-green-700">Outline for {title}</h2>
        <p className="text-green-600">{totalPoints} points total</p>
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
        <Button onClick={() => addQuestion(null)} className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white">
          <Plus size={16} className="mr-2" /> New Question
        </Button>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">Cancel</Button>
        <Button variant="default" className="bg-green-500 hover:bg-green-600 text-white">Save Outline</Button>
      </CardFooter>
    </Card>
  );
};

export default RubricOutline;