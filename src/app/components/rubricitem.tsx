import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Search, Import } from 'lucide-react';

interface RubricItemProps {
  questionNumber: string;
  maxPoints: number;
  title: string;
}

const RubricItem: React.FC<RubricItemProps> = ({ 
  questionNumber, 
  maxPoints,
  title
}) => {
  const [points, setPoints] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [pointAdjustment, setPointAdjustment] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handlePointsChange = (value: number) => {
    const newPoints = Math.min(Math.max(value, 0), maxPoints);
    setPoints(newPoints);
    setIsCorrect(newPoints === maxPoints);
  };

  return (
    <div className="mb-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-[3rem]">
          <span className="text-gray-500 text-sm">{questionNumber}</span>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={points}
                  onChange={(e) => handlePointsChange(parseFloat(e.target.value) || 0)}
                  className="w-16 text-right"
                />
                <span className="text-gray-500">/ {maxPoints} pts</span>
              </div>
              <div className="text-sm mt-1">
                {isCorrect ? (
                  <span className="text-green-600">Correct</span>
                ) : (
                  <span className="text-gray-600">{title}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Search size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-12 space-y-3">

        <div>
          <h4 className="text-sm font-medium mb-1">APPLY PREVIOUSLY USED COMMENTS</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-sm">
              <Plus size={14} className="mr-1" /> Add Rubric Item
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <Import size={14} className="mr-1" /> Import...
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RubricList: React.FC = () => {
  const [rubricItems, setRubricItems] = useState<RubricItemProps[]>([
    { questionNumber: '1', maxPoints: 5, title: 'Simplify the expression 3x + 2x - 4' },
    { questionNumber: '2', maxPoints: 6, title: 'Find the area of a circle with radius 7 cm' },
    { questionNumber: '3', maxPoints: 3, title: 'Find sin(30)' },
    { questionNumber: '4', maxPoints: 4, title: 'Calculate the cost of 7 notebooks' },
  ]);

  const handleAddRubricItem = () => {
    const newQuestionNumber = (rubricItems.length + 1).toString();
    const newRubricItem: RubricItemProps = {
      questionNumber: newQuestionNumber,
      maxPoints: 5,
      title: `New Question ${newQuestionNumber}`,
    };
    setRubricItems([...rubricItems, newRubricItem]);
  };

  return (
    <div>
      <Button variant="outline" size="sm" onClick={handleAddRubricItem} className="mb-4">
        <Plus size={14} className="mr-1" /> Add New Rubric Item
      </Button>

      {rubricItems.map((item, index) => (
        <RubricItem
          key={index}
          questionNumber={item.questionNumber}
          maxPoints={item.maxPoints}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default RubricList;
