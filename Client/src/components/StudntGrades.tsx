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
        be,
        place
    } = student;

    const isFullYear = year > 3;
    const getFullMark = () => {
        return (
            (ar.final || 0) + 
            (en.final || 0) + 
            (ma.final || 0) + 
            (be.final || 0) + 
            (isFullYear ? (sc.final || 0) + (so.final || 0) : 0)
        );
    };
    
    const getFinalGrade = (): number => {
        return ar.grade + en.grade + ma.grade + be.grade + (isFullYear ? sc.grade + so.grade : 0 );
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
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-secondary mb-3">
                        عرض درجات الطالب
                    </h1>
                    {/* <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary mx-auto rounded-full"></div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Student Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-l from-primary to-secondary px-6 py-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-1 h-8 bg-white rounded-full"></div>
                                بيانات الطالب
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <ProfileIcon />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-1">الإسم</p>
                                        <p className="text-lg font-bold text-gray-900">{name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all">
                                    <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                        <RankIcon />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-1">المركز</p>
                                        <p className="text-lg font-bold text-gray-900">#{place}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <CodeIcon />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-1">كود الطالب</p>
                                        <p className="text-lg font-bold text-gray-900">{code}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <YearIcon />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-1">الصف</p>
                                        <p className="text-lg font-bold text-gray-900">{getYearName(year)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20">
                                    <div className="flex-shrink-0 w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                                        <FinalGradeIcon color="#ffffff" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 mb-1">المجموع الكلي</p>
                                        <p className="text-2xl font-black text-primary">
                                            {getFinalGrade()} <span className="text-lg text-gray-500">/ {getFullMark()}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl border-2 border-secondary/20">
                                    <div className="flex-shrink-0 w-14 h-14 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
                                        <PercentIcon />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 mb-1">النسبة المئوية</p>
                                        <p className="text-3xl font-black text-secondary">{stdPercent}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grades Table Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-l from-primary to-secondary px-6 py-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-1 h-8 bg-white rounded-full"></div>
                                درجات المواد
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="overflow-x-auto rounded-2xl shadow-lg">
                                <table className="w-full rounded-2xl">
                                    <thead className="rounded-t-2xl">
                                        <tr className=" border-b-2 border-gray-200">
                                            <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                                                المادة
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                                                الدرجة الكاملة
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                                                درجة الطالب
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                    <span className="text-base font-semibold text-gray-900">اللغة العربية</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-base font-medium text-gray-600">{ar.final}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-xl font-bold text-secondary">{ar.grade}</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                    <span className="text-base font-semibold text-gray-900">اللغة الانجليزية</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-base font-medium text-gray-600">{en.final}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-xl font-bold text-secondary">{en.grade}</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                    <span className="text-base font-semibold text-gray-900">الرياضيات</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-base font-medium text-gray-600">{ma.final}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-xl font-bold text-secondary">{ma.grade}</span>
                                            </td>
                                        </tr>
                                        {isFullYear && <>
                                            <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                        <span className="text-base font-semibold text-gray-900">العلوم</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-base font-medium text-gray-600">{sc.final}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-xl font-bold text-secondary">{sc.grade}</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                        <span className="text-base font-semibold text-gray-900">الدراسات الإجتماعية</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-base font-medium text-gray-600">{so.final}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-xl font-bold text-secondary">{so.grade}</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                        <span className="text-base font-semibold text-gray-900">السلوك</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-base font-medium text-gray-600">{be.final}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-xl font-bold text-secondary">{be.grade}</span>
                                                </td>
                                            </tr>
                                        </>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <button 
                    onClick={() => toggleContent(true)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg group"
                >
                    <span>رجوع</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" className="group-hover:translate-x-1 transition-transform">
                        <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Modal */}
                { (stdPercent <= 40 || stdPercent >= percent) && <Modal
                closeModal={() => setModalIsOpen(false)}
                isOpen={modalIsOpen}   
            >
                { stdPercent >= percent && 
                    <div className="w-full flex flex-col items-center justify-center gap-6 py-4">
                        <div className="text-7xl animate-bounce">🎉</div>
                        <p className="text-center text-4xl md:text-5xl font-black bg-gradient-to-r from-secondary to-[#F26B0F] bg-clip-text text-transparent">
                            تهانينا 🎉
                        </p>
                        <p className="text-center text-[#F26B0F] text-xl md:text-2xl font-bold leading-relaxed">
                            مبروووك أنت من الأوائل في هذه الامتحانات
                        </p>
                        <button 
                            className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
                            onClick={() => setMakeCelebrate(true)}
                        >
                            اضغط للاحتفال 🎊
                        </button>
                    </div>
                } 
                { stdPercent <= 40 &&
                    <div className="w-full flex flex-col items-center justify-center gap-6 py-4">
                        <div className="animate-pulse">
                            <FailedIcon size="100px"/>
                        </div>
                        <p className="text-center text-gray-800 text-xl md:text-2xl font-bold leading-relaxed px-4">
                            الفشل ليس عكس النجاح بل هو جزء من النجاح .. لا تيأس 💮
                        </p>
                        <div className="text-4xl">💪</div>
                    </div>
                }
                </Modal> }
            </div>
        </div>
    );
}

export default StudentGrades;