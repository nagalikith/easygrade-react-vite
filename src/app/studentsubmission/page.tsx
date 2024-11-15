"use client";

import React, { useState } from 'react';
import { X, FileImage, FileText, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AssignQuestionsToPages from '@/app/components/AssignQuestionsToPages'; // Adjust the import path if necessary

interface Question {
  id: string;
  title: string;
  points: number;
}

interface Page {
  id: string;
  assignedQuestions: string[];
}

export default function GradescopeInterface() {
  // Sample data for questions and pages
  const questions: Question[] = [
    { id: 'q1', title: 'Question 1', points: 5 },
    { id: 'q2', title: 'Question 2', points: 10 },
    { id: 'q3', title: 'Question 3', points: 7 },
  ];

  const pages: Page[] = [
    { id: '1', assignedQuestions: [] },
    { id: '2', assignedQuestions: [] },
    { id: '3', assignedQuestions: [] },
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form submission
  const handleAssignmentSubmit = (assignments: Record<string, string[]>) => {
    console.log('Assignments:', assignments);
    // Perform any additional actions, such as saving the assignments
  };

  // Toggle dialog visibility
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <nav className="bg-white border-b px-4 py-2 flex items-center">
        <button className="ml-2">≡</button>
        <div className="ml-4 text-gray-600">Cleferr 101</div>
        <div className="ml-4 text-gray-400">Summer 2020</div>
      </nav>

      {/* Main content */}
      <div className="flex">
        {/* Main area with modal and assignment feature */}
        <div className="flex-1 p-4">
          {/* Button to open dialog */}
          <Button onClick={toggleDialog} variant="primary" className="mb-4">
            Open Assignment Submission
          </Button>

          {/* Assignment Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Submit Assignment</DialogTitle>
              </DialogHeader>
              <div className="bg-teal-600 text-white p-3 -mx-6">
                Submit images for each question, or a single PDF.
              </div>
              <Alert className="mt-4">
                <AlertDescription>
                  Your instructor has provided a PDF to help you complete your assignment.
                </AlertDescription>
              </Alert>
              <Button variant="link" className="mt-2 text-teal-600">
                <Download className="mr-2 h-4 w-4" />
                Download Demo Homework 1 PDF
              </Button>
              <p className="text-gray-500 mt-4">
                Attach one or more image files for your answer to each question. You can also submit a single PDF, and then select the pages corresponding to each question in the next step.
              </p>
              <div className="flex justify-between mt-6">
                <Button variant="outline" className="flex-1 mr-2">
                  <FileImage className="mr-2 h-4 w-4" />
                  SUBMIT IMAGES
                </Button>
                <Button variant="outline" className="flex-1 ml-2">
                  <FileText className="mr-2 h-4 w-4" />
                  SUBMIT PDF
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="absolute right-4 top-4" onClick={toggleDialog}>
                <X className="h-4 w-4" />
                Close
              </Button>
            </DialogContent>
          </Dialog>

          {/* Assign Questions to Pages Feature */}
          <div className="mt-8">
            <AssignQuestionsToPages questions={questions} pages={pages} onSubmit={handleAssignmentSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
