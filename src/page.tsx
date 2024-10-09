'use client';

import React, { useState } from 'react';
import { Settings, User, Book, Clock, BarChart2 } from 'lucide-react';
//import Footer from './components/Footer';


interface Assignment {
  id: string;
  name: string;
  released: string;
  due: string;
  submissions: number;
  graded: number;
  published: boolean;
  regrades?: number;
}

const initialAssignments: Assignment[] = [
  {
    id: '1',
    name: 'Online Quiz',
    released: 'MAR 16',
    due: 'OCT 15 AT 11:00PM',
    submissions: 1,
    graded: 42,
    published: true
  },
  {
    id: '2',
    name: 'Homework 1',
    released: 'DEC 31',
    due: 'JUN 17 AT 10:00AM',
    submissions: 0,
    graded: 0,
    published: true
  },
  {
    id: '3',
    name: 'Demo Midterm Graded',
    released: 'DEC 15',
    due: '',
    submissions: 20,
    graded: 100,
    published: true,
    regrades: 2
  },
  {
    id: '4',
    name: 'Demo Midterm Ungraded',
    released: 'DEC 15',
    due: '',
    submissions: 20,
    graded: 0,
    published: true
  },

  {
    id: '5',
    name: 'Demo Midterm Ungraded',
    released: 'DEC 15',
    due: '',
    submissions: 20,
    graded: 0,
    published: true
  },

  {
    id: '6',
    name: 'Demo Midterm Ungraded',
    released: 'DEC 15',
    due: '',
    submissions: 20,
    graded: 0,
    published: true
  }

  
];

export default function Home() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    const target = e.target as HTMLDivElement;
    target.classList.add('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null) return;
    
    const newAssignments = [...assignments];
    const draggedAssignment = newAssignments[draggedItem];
    
    newAssignments.splice(draggedItem, 1);
    newAssignments.splice(dropIndex, 0, draggedAssignment);
    
    setAssignments(newAssignments);
    setDraggedItem(null);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLDivElement;
    target.classList.remove('opacity-50');
  };

  return (
    <div className=" bg-blue-50 min-h-screen p-0">
      <div className=" mx-auto bg-white rounded-lg shadow-lg min-h-screen flex flex-col">
        <div className="flex flex-col md:flex-row flex-1">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-indigo-900 text-white p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 mr-2 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-indigo-900 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">Cleferr™</h1>
            </div>
  
            <nav className="space-y-4">
              <a href="#" className="flex items-center text-blue-200 hover:text-white transition duration-300 ease-in-out">
                <BarChart2 className="mr-2" size={20} aria-hidden="true" />
                <span aria-label="Dashboard">Dashboard</span>
              </a>
              <a href="#" className="flex items-center text-blue-200 hover:text-white transition duration-300 ease-in-out">
                <Book className="mr-2" size={20} aria-hidden="true" />
                <span aria-label="Assignments">Assignments</span>
              </a>
              <a href="#" className="flex items-center text-blue-200 hover:text-white transition duration-300 ease-in-out">
                <User className="mr-2" size={20} aria-hidden="true" />
                <span aria-label="Roster">Roster</span>
              </a>
              <a href="#" className="flex items-center text-blue-200 hover:text-white transition duration-300 ease-in-out">
                <Clock className="mr-2" size={20} aria-hidden="true" />
                <span aria-label="Extensions">Extensions</span>
              </a>
              <a href="#" className="flex items-center text-blue-200 hover:text-white transition duration-300 ease-in-out">
                <Settings className="mr-2" size={20} aria-hidden="true" />
                <span aria-label="Course Settings">Course Settings</span>
              </a>
            </nav>
  
            <div className="mt-8">
              <h2 className="text-sm uppercase text-blue-300 mb-2">Instructor</h2>
              <div className="flex items-center">
                <User className="mr-2" size={20} aria-hidden="true" />
                <span>Demo Instructor</span>
              </div>
            </div>
          </div>
  
          {/* Main content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Cleferr 101</h1>
                <p className="text-gray-600">Spring 2024</p>
              </div>
              <div className="text-gray-600">
                Entry Code: <span className="font-mono text-indigo-600">XYZ789</span>
              </div>
            </div>
  
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Description</h2>
              <p className="text-gray-600">This is a course for demo presentations.</p>
            </div>
  
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Things To Do</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Finish grading Demo Midterm (Ungraded)</li>
                <li>Respond to 2 outstanding regrade requests for Demo Midterm (Graded)</li>
              </ul>
            </div>
  
            <div>
              <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-600 mb-2">
                <div className="col-span-2">ACTIVE ASSIGNMENTS</div>
                <div>RELEASED</div>
                <div>DUE (PDT)</div>
                <div>SUBMISSIONS</div>
                <div>% GRADED</div>
                <div>PUBLISHED</div>
              </div>
              {assignments.map((assignment, index) => (
                <div
                  key={assignment.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className="grid grid-cols-7 gap-4 items-center bg-gray-50 p-4 rounded-lg mb-2 cursor-move hover:bg-gray-100 transition duration-200"
                >
                  <div className="col-span-2">{assignment.name}</div>
                  <div>{assignment.released}</div>
                  <div>{assignment.due}</div>
                  <div>{assignment.submissions}</div>
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${assignment.graded}%` }}
                      />
                    </div>
                    <span className="text-sm">{assignment.graded}%</span>
                  </div>
                  <div>
                    {assignment.published ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">ON</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">OFF</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        </div>
        {/*Footer <Footer /> */}
        
      </div>
    </div>
  );
}