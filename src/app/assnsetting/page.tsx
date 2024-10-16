'use client';

import React, { useState } from 'react';
import { FileText, Calendar, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AssignmentSettingsDialog() {
  const [formData, setFormData] = useState({
    assignmentType: 'Homework / Problem Set',
    assignmentName: '',
    template: null,
    uploadSubmissions: 'student',
    releaseDate: '',
    dueDate: '',
    submissionType: 'variable',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      template: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('/api/submit-assignment', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the assignment');
      }

      const result = await response.json();
      console.log(result.message);
      // Handle success (e.g., show a success message, close the dialog)
    } catch (error) {
      console.error('Error submitting assignment:', error);
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
              <span>{formData.assignmentType}</span>
            </div>
          </div>

          {/* Assignment Name */}
          <div>
            <Label className="text-sm text-muted-foreground">ASSIGNMENT NAME</Label>
            <Input 
              name="assignmentName"
              value={formData.assignmentName}
              onChange={handleInputChange}
              placeholder="Name your assignment" 
              className="mt-2" 
            />
          </div>

          {/* Template */}
          <div>
            <Label className="text-sm text-muted-foreground">TEMPLATE</Label>
            <div className="flex gap-2 mt-2">
              <Button type="button" variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                {formData.template ? formData.template.name : 'Please select a file'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => document.getElementById('file-upload').click()}>
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
            <Label className="text-sm text-muted-foreground">WHO WILL UPLOAD SUBMISSIONS?</Label>
            <RadioGroup 
              name="uploadSubmissions"
              value={formData.uploadSubmissions}
              onValueChange={(value) => handleInputChange({ target: { name: 'uploadSubmissions', value } })}
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
              <Label className="text-sm text-muted-foreground">RELEASE DATE (PDT)</Label>
              <Input
                type="datetime-local"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div className="flex-1">
              <Label className="text-sm text-muted-foreground">DUE DATE (PDT)</Label>
              <Input
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
              onValueChange={(value) => handleInputChange({ target: { name: 'submissionType', value } })}
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