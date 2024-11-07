'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Settings, User, Book, Clock, BarChart2, Loader2, FileSpreadsheet, AlertCircle, Plus  } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Course {
  id: string;
  name: string;
  term: string;
  description: string;
  entryCode: string;
  sectionId: string;
  instructors: Instructor[];
}

interface Instructor {
  name: string;
}

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

const EmptyState = () => (
  <Card className="mt-8">
    <CardContent className="flex flex-col items-center justify-center py-12">
      <FileSpreadsheet className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments yet</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        Get started by creating your first assignment. You can set due dates, 
        upload materials, and manage submissions all in one place.
      </p>
      <Button 
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4" />
        Create Assignment
      </Button>
    </CardContent>
  </Card>
);


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000',
  timeout: 5000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default function CoursePageComponent() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [course, setCourse] = useState<Course | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

    // Drag and drop handlers
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
  
    const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      if (draggedItem === null) return;
      
      const newAssignments = [...assignments];
      const draggedAssignment = newAssignments[draggedItem];
      
      newAssignments.splice(draggedItem, 1);
      newAssignments.splice(dropIndex, 0, draggedAssignment);
      
      try {
        if (!course?.sectionId) {
          throw new Error('Section ID not found');
        }
  
        await api.put(`/courses/sections/${course.sectionId}/assignments/order`, {
          assignmentIds: newAssignments.map(a => a.id)
        });
        
        setAssignments(newAssignments);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          router.push('/login');
        } else {
          setError('Failed to update assignment order');
          // Revert to original order if update fails
          setAssignments(assignments);
        }
      }
      
      setDraggedItem(null);
    };
  
    const handleDragEnd = (e: React.DragEvent) => {
      const target = e.target as HTMLDivElement;
      target.classList.remove('opacity-50');
      setDraggedItem(null);
    };

  // Extract section ID from URL if available
  const getSectionIdFromUrl = (): string | null => {
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      const sectionIndex = pathParts.indexOf('courses') + 1;
      return pathParts[sectionIndex] || null;
    }
    return null;
  };

  

  // Fetch course and assignment data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        const sectionId = getSectionIdFromUrl();
        
        if (!sectionId) {
          throw new Error('Section ID not found');
        }


        const [courseResponse, assignmentsResponse] = await Promise.all([
          api.get<Course>(`/api/sections/${sectionId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }),
          api.get<Assignment[]>(`/api/sections/${sectionId}/assignments`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }),
        ]);
        
        setCourse(courseResponse.data);
        setAssignments(assignmentsResponse.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          // Handle unauthorized access
          router.push('/login');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to fetch course data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [router]);

  // Handle course navigation
  const handleCourseNavigation = (sectionId: string) => {
    router.push(`/courses/${sectionId}`);
  };

  // Update assignment order with authentication
  const updateAssignmentOrder = async (newOrder: Assignment[]) => {
    try {
      if (!course?.sectionId) {
        throw new Error('Section ID not found');
      }

      await api.put(`/courses/sections/${course.sectionId}/assignments/order`, {
        assignmentIds: newOrder.map(a => a.id)
      });
      
      setAssignments(newOrder);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push('/login');
      } else {
        setError('Failed to update assignment order');
      }
    }
  };

  // Navigation menu items with section handling
  const navigationItems = [
    {
      icon: BarChart2,
      label: 'Dashboard',
      path: `/dashboard`
    },
    {
      icon: Book,
      label: 'Assignments',
      path: `/courses/${course?.sectionId}/assignments`
    },
    {
      icon: User,
      label: 'Roster',
      path: `/courses/${course?.sectionId}/roster`
    },
    {
      icon: Clock,
      label: 'Extensions',
      path: `/courses/${course?.sectionId}/extensions`
    },
    {
      icon: Settings,
      label: 'Course Settings',
      path: `/courses/${course?.sectionId}/settings`
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (Object.keys(assignments).length === 1) return <EmptyState />;

  return (
    <div className="bg-blue-50 p-4">
      <div className="mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
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
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(item.path);
                  }}
                  className="flex items-center text-blue-200 hover:text-white transition duration-300"
                >
                  <item.icon className="mr-2" size={20} />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-9">
              <h2 className="text-sm uppercase text-blue-300 mb-2">Instructors</h2>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-grow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{course?.name}</h1>
                <p className="text-gray-600">{course?.term}</p>
              </div>
              <div className="text-gray-600">
                Entry Code: <span className="font-mono text-indigo-600">{course?.entryCode}</span>
              </div>
            </div>
                <Button
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  New Assignment
                </Button>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Description</h2>
              <p className="text-gray-600">{course?.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Things To Do</h2>
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
                  onDragEnd={(e) => (e.target as HTMLDivElement).classList.remove('opacity-50')}
                  className="grid grid-cols-7 gap-4 items-center bg-gray-50 p-4 rounded-lg mb-2 cursor-move hover:bg-gray-100 transition duration-200"
                >
                  <div 
                    className="col-span-2 hover:text-indigo-600 cursor-pointer"
                    onClick={() => handleCourseNavigation(`${course?.sectionId}/assignments/${assignment.id}`)}
                  >
                    {assignment.name}
                  </div>
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
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        ON
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        OFF
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}