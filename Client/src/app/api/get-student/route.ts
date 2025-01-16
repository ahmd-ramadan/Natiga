import { NextResponse } from 'next/server';
import Student, { IStudent } from '@/models/Student';
import dbConnect from '@/lib/dbConnections';
import Material from '@/models/Material';

export async function GET(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const stdCode = searchParams.get('stdCode');

    // Validate the input
    if (!stdCode || typeof stdCode !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid student code' },
        { status: 400 }
      );
    }

    // Fetch the student from the database
    const student: IStudent | null = await Student.findOne({ code: stdCode });

    // Check if the student exists
    if (!student) {
      return NextResponse.json(
        { success: false, msg: 'كود الطالب غير صحيح' },
        { status: 404 }
      );
    }



    const materialsForYear = await Material.findOne({ year: student.year });
    if (!materialsForYear) {
      return NextResponse.json(
        { success: false, msg: 'لقد حث خطأ' },
        { status: 404 }
      );
    }

    const response = {
      code: student.code,
      name: student.name,
      year: student.year,
      percent: materialsForYear.percent,
      ar: {
        grade: student?.ar,
        final: materialsForYear?.ar,
      },
      en: {
        grade: student?.en,
        final: materialsForYear?.en,
      },
      ma: {
        grade: student?.ma,
        final: materialsForYear?.ma,
      },
      sc: {
        grade: student?.sc,
        final: materialsForYear?.sc,
      },
      so: {
        grade: student?.so,
        final: materialsForYear?.so,
      },
      place: student?.place,
    };

    
    // Return the student data
    return NextResponse.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}