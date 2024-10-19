"use client"
import { Plus, Menu } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '@/app/hooks/useAuth';

// Axios instance for API requests
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

interface CourseProps {
  title: string;
  subtitle: string;
  assignmentCount: number;
  sectionId: string;
}

interface ApiResponse {
  status: boolean;
  courses: {
    [term: string]: CourseProps[];
  };
  error?: string;
}

const EmptyState = () => (
  <div className="flex flex-col h-screen bg-background">
    <header className="border-b flex-shrink-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        <h1 className="text-teal-600 font-semibold text-lg mr-4">Cleferr AI</h1>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
    
    <div className="flex-grow max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6">
        <h1 className="text-lg font-medium mb-2">Your Courses</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to Cleferr AI! Click on one of your courses to the right, or on the Account menu below.
        </p>
      </div>
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md p-6 text-center">
          <CardContent>
            <h3 className="text-lg font-medium mb-2">No Courses Available</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get started by enrolling in a course or creating one if you're an instructor.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="h-8">
                Enroll in Course
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white h-8">
                Create Course +
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
    <footer className="border-t bg-background flex-shrink-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Button variant="ghost" className="h-8">Account</Button>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="h-8">Enroll in Course</Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white h-8">
            Create Course +
          </Button>
        </div>
      </div>
    </footer>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col h-screen bg-background">
    <header className="border-b flex-shrink-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        <h1 className="text-teal-600 font-semibold text-lg mr-4">Cleferr AI</h1>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
    
    <div className="flex-grow flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h3 className="text-lg font-medium text-center mb-2">Unable to Load Courses</h3>
          <p className="text-sm text-center text-muted-foreground">
            {message}
          </p>
        </CardContent>
      </Card>
    </div>
    
    <footer className="border-t bg-background flex-shrink-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Button variant="ghost" className="h-8">Account</Button>
      </div>
    </footer>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col h-screen bg-background">
    <header className="border-b flex-shrink-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"/>
      </div>
    </header>
    
    <div className="flex-grow max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6 space-y-2">
        <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"/>
        <div className="h-4 w-96 bg-gray-200 animate-pulse rounded"/>
      </div>
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="h-32 bg-gray-200 animate-pulse rounded"/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <footer className="border-t bg-background flex-shrink-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"/>
      </div>
    </footer>
  </div>
);


export default function Dashboard() {
  const [courses, setCourses] = useState<ApiResponse['courses']>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { accessToken } = useAuthStore.getState();
    if (!accessToken) {
      throw new Error('Access token not found');
    }
  
      // Make a request to the Flask backend to fetch the sections
      console.log("ACCESSS KEY ", accessToken)
      const response = await api.get<{ courses: any; status: boolean; error?: string }>('/api/sections', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
  
      const data = response.data;

      console.log(data)
  
      // Validate the response data
      if (!data.status) {
        throw new Error(data.error || 'Failed to load courses');
      }
  
      // Check if the courses object is empty
      if (Object.keys(data.courses).length === 0) {
        return; // Handle the empty state if necessary
      }
  
      // Update the state with the fetched courses
      setCourses(data.courses);
    } catch (err) {
      // Set the error message in the state
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      // Set the loading state to false
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return <LoadingState />;
  }

  // Show error state
  if (error) {
    return <ErrorState message={error} />;
  }

  // Show empty state if no courses
  if (Object.keys(courses).length === 0) {
    return <EmptyState />;
  }

  // If we get here, we have courses to display
  // Return your original dashboard implementation here...
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <h1 className="text-teal-600 font-semibold text-lg mr-4">Cleferr AI</h1>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      {/* ... Rest of your existing dashboard implementation ... */}
    </div>
  );
}