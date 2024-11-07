import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizonsView = () => {
  const horizonData = {
    today: {
      title: 'Today',
      date: 'Wed, 10 January',
      tasks: [
        { id: 1, title: 'Lift 50KG Bench', subtext: 'Reach 50KG', color: 'text-pink-800' },
        { id: 2, title: 'Break', time: '10:20 AM to 11:20 AM', color: ' text-green-800' },
        { id: 3, title: 'Fun With Math', time: '12:50 AM to 8:50 AM', color: ' text-green-800' },
        { id: 4, title: 'Finish Grading Midterm', time: '8:00 PM to 9:00 PM', color: 'bg-blue-100 text-blue-800' },
        { id: 10, title: 'Run Marathon' }
      ]
    },
    week: {
      title: 'Week',
      date: '8-14 Jan',
      tasks: [
        { id: 1, title: 'Meeting Notes: Karl', subtext: 'Launch Conference / People to Email', color: 'bg-gray-100' }
      ]
    },
    month: {
      title: 'Month',
      date: 'January',
      tasks: [
        { id: 1, title: 'Write 50 Medium Articles', subtext: '1 subgoal', color: 'bg-gray-100' },
        { id: 2, title: 'Explore Olympia', subtext: 'Launch Conference / Venues to Look At', color: 'bg-gray-100', image: '/api/placeholder/400/200' }
      ]
    },
    quarter: {
      title: 'Quarter',
      date: 'Q1',
      tasks: [
        { id: 1, title: 'Reach 90KG', subtext: 'Become a World Cup Winner & Beat Messi\n1 subgoal', color: 'bg-gray-100' }
      ]
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Horizons Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Today Section - Takes up 6 columns with dotted line */}
            <div className="col-span-4 border-r-2 ">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-4xl font-bold">{horizonData.today.title}</h2>
                <span className="text-sm text-gray-500">{horizonData.today.date}</span>
              </div>
              <div className="space-y-3">
                {horizonData.today.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-lg p-4 ${task.color || 'bg-white'} shadow-sm hover:bg-gray-200 transition`}
                  >
                    <div className="flex items-start space-x-3">
                      <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300" />
                      <div className="flex-1">
                        <div className="font-medium">{task.title}</div>
                        {task.time && (
                          <div className="text-sm text-gray-500">{task.time}</div>
                        )}
                        {task.subtext && (
                          <div className="text-sm text-gray-500">{task.subtext}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-gray-500 text-sm p-2">Add...</div>
              </div>
            </div>

            {/* Other Time Horizons - Each takes up 2 columns with dotted lines */}
            {['week', 'month', 'quarter'].map((period) => (
              <div key={period} className="col-span-2 border-r-2  last:border-none">
                <div className="mb-4">
                  <h2 className="text-lg font-bold">{horizonData[period].title}</h2>
                  {/* Move the date under the title and make it smaller */}
                  <span className="text-sm text-gray-500 block">{horizonData[period].date}</span>
                </div>
                <div className="space-y-2">
                  {horizonData[period].tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`rounded-lg p-3 ${task.color || 'bg-white'} shadow-sm hover:bg-gray-200 transition`}
                    >
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{task.title}</div>
                          {task.subtext && (
                            <div className="text-xs text-gray-500">{task.subtext}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-gray-500 text-xs p-2">Add...</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Navigation */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex space-x-4">
              <button className="p-2"><ChevronLeft /></button>
              <button className="p-2">Today</button>
              <button className="p-2"><ChevronRight /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizonsView;
