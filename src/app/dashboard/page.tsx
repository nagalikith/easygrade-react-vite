import React from 'react';
import { Menu, Filter, HelpCircle, Grid } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardContent } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import GradingInterface from '@/app/components/gradinginterface';

const GradingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-teal-600 text-2xl font-semibold mr-4">Cleferr</h1>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Grading for Demos - Math Remote Assessment</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Grade student submissions for the Math Remote Assessment.
            </p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter evaluations
                </Button>
                <Button variant="outline" className="flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </Button>
              </div>
              <Button variant="outline" className="flex items-center">
                <Grid className="w-4 h-4 mr-2" />
                Overview grid
              </Button>
            </div>
          </CardHeader>
        </Card>

        <GradingInterface />

        <Separator className="my-8" />

        <Button variant="link" className="text-teal-600 hover:text-teal-700 mt-4">
          Back to all assessments
        </Button>
      </main>

      <footer className="fixed bottom-0 w-full bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" size="lg">Previous Submission</Button>
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
              Next Submission
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GradingPage;