import React from 'react';
import { X, FileImage, FileText, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

export default function GradescopeInterface() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <nav className="bg-white border-b px-4 py-2 flex items-center">
        <div className="flex items-center gap-2 text-teal-600 font-semibold">
          <div className="w-4 h-4 bg-teal-600"></div>
          gradescope
        </div>
        <button className="ml-2">≡</button>
        <div className="ml-4 text-gray-600">Gradescope 101</div>
        <div className="ml-4 text-gray-400">Summer 2020</div>
      </nav>

      {/* Main content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen border-r p-4">
          <h2 className="font-semibold mb-2">Gradescope 101</h2>
          <div className="text-sm text-gray-500 mb-4">Introduction to Gradescope</div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 text-teal-600 mb-2">
              <div className="w-4 h-4 border-2 border-teal-600"></div>
              Dashboard
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
              Regrade Requests
            </div>
          </div>

          <div className="mb-2 text-gray-500 text-sm">INSTRUCTORS</div>
          {['John Hetherington', 'Eric Reddy', 'Peter Kerr', 'Sarah Wareham', 'Jules Money', 'Amy Hutchinson'].map(name => (
            <div key={name} className="flex items-center gap-2 mb-2 text-gray-600">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                {name.charAt(0)}
              </div>
              {name}
            </div>
          ))}
        </div>

        {/* Main area with modal */}
        <div className="flex-1 p-4">
          <Dialog open={true}>
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
              <Button variant="ghost" size="sm" className="absolute right-4 top-4">
                <X className="h-4 w-4" />
                Close
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}