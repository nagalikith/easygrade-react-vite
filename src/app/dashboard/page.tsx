import { Plus, Menu } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
interface CourseProps {
  title: string;
  subtitle: string;
  assignmentCount: number;
}

const CourseCard = ({ title, subtitle, assignmentCount }: CourseProps) => (
  <Card className="group hover:border-teal-500 transition-colors">
    <CardHeader className="p-4">
      <h3 className="text-base font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="bg-teal-600 text-white text-xs py-1 px-2 rounded-sm inline-block">
        {assignmentCount} assignment{assignmentCount !== 1 ? 's' : ''}
      </div>
    </CardContent>
  </Card>
);

const CreateCourseCard = () => (
  <Card className="border-2 border-dashed hover:border-teal-500 transition-colors">
    <CardContent className="flex items-center justify-center h-[100px] p-4">
      <Button variant="ghost" className="text-teal-600 hover:text-teal-700 hover:bg-transparent h-full">
        <Plus className="w-4 h-4 mr-2" />
        Create a new course
      </Button>
    </CardContent>
  </Card>
);

interface SemesterProps {
  name: string;
  courses: CourseProps[];
}

const Semester = ({ name, courses }: SemesterProps) => (
  <section className="mb-6">
    <h2 className="text-base font-medium mb-3">{name}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {courses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
      {name === 'Fall 2020' && <CreateCourseCard />}
    </div>
  </section>
);

export default function Dashboard() {
  const courses: Record<string, CourseProps[]> = {
    fall2020: [
      {
        title: "Cleferr 102",
        subtitle: "Advanced Cleferr Features",
        assignmentCount: 3,
      },
    ],
    summer2020: [
      {
        title: "Cleferr 101",
        subtitle: "Introduction to Cleferr",
        assignmentCount: 1,
      },
      {
        title: "Cleferr 202",
        subtitle: "Advanced Cleferr Features",
        assignmentCount: 2,
      },
    ],
  };

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
  
  <div className="flex-grow max-w-7xl mx-auto px-4 py-4">
    <div className="mb-6">
      <h1 className="text-lg font-medium mb-2">Your Courses</h1>
      <p className="text-sm text-muted-foreground">
        Welcome to Cleferr AI! Click on one of your courses to the right, or on the Account menu below.
      </p>
    </div>

    <Semester name="Fall 2020" courses={courses.fall2020} />
    <Semester name="Summer 2020" courses={courses.summer2020} />

    <Button variant="link" className="text-teal-600 hover:text-teal-700 p-0 h-8">
      See older courses
    </Button>
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
}