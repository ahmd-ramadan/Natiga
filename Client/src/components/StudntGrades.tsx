'use client'

import { getYearName } from "@/utils/yearName";
import { IStudent } from "./Content";
import confetti from 'canvas-confetti';
import { useEffect, useState } from "react";
import Image from "next/image";
import ProfileIcon from "./icons/Profile";
import CodeIcon from "./icons/Code";
import YearIcon from "./icons/Year";
import FinalGradeIcon from "./icons/FinalGrade";
import PercentIcon from "./icons/Percent";
import RankIcon from "./icons/Rank";
import Modal from "./Modal";
import FailedIcon from "./icons/Failed";


interface IStudentGradesProps {
    toggleContent: (value: boolean) => void;
    student: IStudent;
}

const StudentGrades = ({ toggleContent, student }: IStudentGradesProps) => {
    const {
        code,
        year,
        name,
        percent,
        ar,
        en,
        ma,
        sc,
        so,
        place
    } = student;

    const isFullYear = year > 3;
    const getFullMark = () => {
        return (
            (ar.final || 0) + 
            (en.final || 0) + 
            (ma.final || 0) + 
            (isFullYear ? (sc.final || 0) + (so.final || 0) : 0)
        );
    };
    
    const getFinalGrade = (): number => {
        return ar.grade + en.grade + ma.grade + (isFullYear ? sc.grade + so.grade : 0 );
    }

    const getPercent = (): number => {
        return Math.floor((getFinalGrade() * 100) / getFullMark());
    }
    const stdPercent = getPercent();

    const [modalIsOpen, setModalIsOpen] = useState(true);

    // Trigger confetti if the percentage is greater than or equal to the required percentage
    const [makeCelebrate, setMakeCelebrate] = useState<boolean>(false);
    useEffect(() => {
        if (makeCelebrate) {
            confetti({
                particleCount: 600,
                spread: 200,
                origin: { y: 0.6 },
            });
        }
        setMakeCelebrate(false);
    }, [makeCelebrate, setMakeCelebrate]);
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mt-4">
            <div className="md:col-span-2">
                <h1 className="text-3xl font-extrabold text-black text-center">عرض درجات الطالب</h1>
            </div>

            <div className="bg-primary font-semibold text-white border border-gray-200 rounded-md shadow-md flex flex-col gap-2 p-2">
                <h2 className="text-lg font-bold">بيانات الطالب</h2>
                <hr />
                <div className="flex items-center gap-2 w-full p-2 text-primary bg-white rounde-md">
                    <ProfileIcon />
                    <p className="">الإسم:</p>
                    <p className="text-secondary">{name}</p>
                </div>
                <div className="flex items-center gap-2 w-full p-2 text-primary bg-white rounde-md">
                    <RankIcon />
                    <p className="">المركز:</p>
                    <p className="text-secondary">{place}</p>
                </div>

                <div className="flex items-center gap-2 w-full p-2 text-primary bg-white rounde-md">
                    <CodeIcon />
                    <p>كود الطالب:</p>
                    <p className="text-secondary">{code}</p>
                </div>
                
                <div className="flex items-center gap-2 w-full p-2 text-primary bg-white rounde-md">
                    <YearIcon />
                    <p>الصف:</p>
                    <p className="text-secondary">{ getYearName(year) }</p>
                </div>
                
                <div className="flex items-center gap-2 w-full px-2 py-1 text-primary bg-white rounde-md">
                    <FinalGradeIcon />
                    <p>المجموع الكلي:</p>
                    <p className="text-secondary">{getFinalGrade()} من {getFullMark()}</p>
                </div>

                <div className="flex items-center gap-2 w-full p-2 text-primary bg-white rounde-md">
                    <PercentIcon />
                    <p>النسبة المئوية:</p>
                    <p className="text-secondary">{stdPercent}%</p>
                </div>
            </div>

            <div className="bg-primary text-white font-semibold border border-gary-200 rounded-md shadow-md flex flex-col gap-2 p-2">
                <h2 className="text-lg font-bold">درجات المواد</h2>
                <hr />
                
                <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-lg ext-left rtl:text-right">
                        <thead className="text-lg font-semibold text-black uppercase bg-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    المادة
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    الدرجة 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    درجة الطالب
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b ">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    اللغة العربية
                                </th>
                                <td className="px-6 py-4">
                                    { ar.final }
                                </td>
                                <td className="px-6 py-4 text-secondary">
                                    { ar.grade }
                                </td>
                            </tr>
                            <tr className="border-b">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    اللغة الانجليزية
                                </th>
                                <td className="px-6 py-4 ">
                                    { en.final }
                                </td>
                                <td className="px-6 py-4 text-secondary">
                                    { en.grade }
                                </td>
                            </tr>
                            <tr className="border-b">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    الرياضيات
                                </th>
                                <td className="px-6 py-4">
                                    { ma.final }
                                </td>
                                <td className="px-6 py-4 text-secondary">
                                    { ma.grade }
                                </td>
                            </tr>
                            { isFullYear && <>
                                <tr className="border-b">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        العلوم
                                    </th>
                                    <td className="px-6 py-4">
                                        { sc.final }
                                    </td>
                                    <td className="px-6 py-4 text-secondary">
                                        { sc.grade }
                                    </td>
                                </tr>
                                <tr className="">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        الدراسات الإجتماعية
                                    </th>
                                    <td className="px-6 py-4">
                                        { so.final }
                                    </td>
                                    <td className="px-6 py-4 text-secondary">
                                        { so.grade }
                                    </td>
                                </tr> </> 
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="md:col-span-2">
                <button 
                    onClick={() => toggleContent(true)}
                    className="bg-primary flex items-center gap-2 justify-center text-white w-full p-2"
                >
                    <p>رجوع</p>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#fffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
            </div>

            { (stdPercent <= 40 || stdPercent >= percent) && <Modal
                closeModal={() => setModalIsOpen(false)}
                isOpen={modalIsOpen}   
            >
                { stdPercent >= percent && 
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <p className="text-center text-3xl font-bold text-red-700">تهانينا 🎉🎉</p>
                        <p className="text-center text-secondary text-lg md:text-2xl font-semibold">مبروووك أنت من الأوائل في هذه الامتحانات </p>
                        <button className="bg-primary text-white font-semibold p-2 rounded-md shadow-md" onClick={() => setMakeCelebrate(true)}>إحتفال</button>
                    </div>
                } 
                { stdPercent <= 40 &&
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <FailedIcon size="80px"/>
                        <p className="text-center text-black text-xl md:text-2xl font-semibold"> للأسف .. لقد رسبت في هذه الامتحانات </p>
                    </div>

                }

            </Modal> }
        </div>
    );
}

export default StudentGrades;