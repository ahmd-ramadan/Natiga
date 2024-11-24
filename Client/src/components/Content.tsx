'use client'
import { useState } from "react";
import CodeInput from "./CodeInput";
import StudentGrades from "./StudntGrades";

export interface IMaterial {
    grade: number;
    final: number;
}
export interface IStudent {
    code: string;
    name: string;
    year: number;
    percent: number;
    ar: IMaterial;
    en: IMaterial;
    ma: IMaterial;
    sc: IMaterial;
    so: IMaterial;
}

const Content = () => {
    const [content, toggleContent] = useState<boolean>(true);  
    const [student, setStudent] = useState<IStudent>({} as IStudent);

    return (
        <main className="w-full">
            <section className="w-full">
                <div className="mx-auto max-w-screen-xl px-4 pb-8 lg:flex lg:items-center">
                    { content ? 
                        <CodeInput toggleContent={toggleContent} setStudent={setStudent}></CodeInput>
                    : 
                        <StudentGrades toggleContent={toggleContent} student={student}></StudentGrades>
                    }
                </div>
            </section>
        </main>
    );
}

export default Content;