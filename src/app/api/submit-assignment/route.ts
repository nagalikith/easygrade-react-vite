import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  
  // Extract form data
  const assignmentType = formData.get('assignmentType');
  const assignmentName = formData.get('assignmentName');
  const template = formData.get('template');
  const uploadSubmissions = formData.get('uploadSubmissions');
  const releaseDate = formData.get('releaseDate');
  const dueDate = formData.get('dueDate');
  const submissionType = formData.get('submissionType');

  // Process the data (e.g., save to database, validate, etc.)
  console.log('Received assignment data:', {
    assignmentType,
    assignmentName,
    template,
    uploadSubmissions,
    releaseDate,
    dueDate,
    submissionType
  });

  // Return a response
  return NextResponse.json({ message: 'Assignment created successfully' }, { status: 201 });
}