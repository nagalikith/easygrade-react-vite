'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FileText, Calendar, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define types for the form data
type UploadSubmissionType = 'student' | 'instructor';
type SubmissionType = 'variable' | 'templated';
type AssignmentType = 'pdf'|  'Problem Set' | 'Code Submit';

interface FormData {
  assignmentType: AssignmentType;
  assignmentName: string;
  template: File | null;
  uploadSubmissions: UploadSubmissionType;
  releaseDate: string;
  dueDate: string;
  submissionType: SubmissionType;
}

// Define the initial state
const initialFormData: FormData = {
  assignmentType: 'pdf',
  assignmentName: '',
  template: null,
  uploadSubmissions: 'student',
  releaseDate: '',
  dueDate: '',
  submissionType: 'variable',
};

interface ApiResponse {
  message: string;
  // Add other response fields as needed
}

export default function AssignmentSettingsDialog() {
  const [assignmentType, setAssignmentType] = useState("Select Assignment Type");

  // Options for assignment types
  const assignmentOptions = ["Homework", "Problem Set","Code Submit"];
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData(prevState => ({
      ...prevState,
      template: file
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the assignment');
      }

      const result: ApiResponse = await response.json();
      console.log(result.message);
      // Handle success (e.g., show a success message, close the dialog)
    } catch (error) {
      console.error('Error submitting assignment:', error instanceof Error ? error.message : 'Unknown error');
      // Handle error (e.g., show an error message)
    }
  };

  return (

    <Dialog open>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FileText className="h-5 w-5" />
            </Button>
            Assignment Settings
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Assignment Type */}
          <div>
          <Label className="text-sm text-muted-foreground">ASSIGNMENT TYPE</Label>
          <div className="flex items-center gap-2 mt-2">
            <FileText className="h-5 w-5 text-primary" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span>{assignmentType}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Assignment Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {assignmentOptions.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setAssignmentType(type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
              
          {/* Assignment Name */}
          <div>
            <Label htmlFor="assignmentName" className="text-sm text-muted-foreground">
              ASSIGNMENT NAME
            </Label>
            <Input 
              id="assignmentName"
              name="assignmentName"
              value={formData.assignmentName}
              onChange={handleInputChange}
              placeholder="Name your assignment" 
              className="mt-2" 
            />
          </div>

          {/* Template */}
          <div>
            <Label htmlFor="file-upload" className="text-sm text-muted-foreground">
              TEMPLATE
            </Label>
            <div className="flex gap-2 mt-2">
              <Button type="button" variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                {formData.template ? formData.template.name : 'Please select a file'}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Select PDF
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Who will upload submissions */}
          <div>
            <Label className="text-sm text-muted-foreground">
              WHO WILL UPLOAD SUBMISSIONS?
            </Label>
            <RadioGroup 
              name="uploadSubmissions"
              value={formData.uploadSubmissions}
              onValueChange={(value: UploadSubmissionType) => 
                handleInputChange({ target: { name: 'uploadSubmissions', value } })
              }
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instructor" id="instructor" />
                <Label htmlFor="instructor">Instructor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Dates */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="releaseDate" className="text-sm text-muted-foreground">
                RELEASE DATE (PDT)
              </Label>
              <Input
                id="releaseDate"
                type="datetime-local"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="dueDate" className="text-sm text-muted-foreground">
                DUE DATE (PDT)
              </Label>
              <Input
                id="dueDate"
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
          </div>

          {/* Submission Type */}
          <div>
            <Label className="text-sm text-muted-foreground">SUBMISSION TYPE</Label>
            <RadioGroup 
              name="submissionType"
              value={formData.submissionType}
              onValueChange={(value: SubmissionType) => 
                handleInputChange({ target: { name: 'submissionType', value } })
              }
              className="space-y-3 mt-2"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="variable" id="variable" className="mt-1" />
                <div>
                  <Label htmlFor="variable">Variable Length</Label>
                  <p className="text-sm text-muted-foreground">
                    Students submit any number of pages and indicate the pages where their question responses are.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="templated" id="templated" className="mt-1" />
                <div>
                  <Label htmlFor="templated">Templated (Fixed Length)</Label>
                  <p className="text-sm text-muted-foreground">
                    Students submit work where answers are in fixed locations (like worksheets).
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Create Assignment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}