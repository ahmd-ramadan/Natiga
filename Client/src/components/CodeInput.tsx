'use client'

import { getData } from "@/utils/apiService";
import { useState } from "react";
import Spinner from "./Spinner";
import { IStudent } from "./Content";
import CodeIcon from "./icons/Code";
import ArrowIcon from "./icons/Arrow";

interface ICodeInputProps {
    toggleContent: (value: boolean) => void;
    setStudent: (student: IStudent) => void;
}

const CodeInput = ({ toggleContent, setStudent }: ICodeInputProps ) => {

    const [codeValue, setCodeValue] = useState<string>("");
    const [codeInputError, setCodeInputError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (code: string) => {
        try {
            setIsLoading(true);

            const response = await getData<IStudent>({ 
                endpoint: `/get-student/?stdCode=${code}`
            }) as any;
            if(response.success) {
                setStudent(response.data);
                toggleContent(false);
            } else {
                setCodeInputError(response?.msg || "كود الطالب غير صحيحح");
            }
        } 
        catch {}
        finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="min-h-screene py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary mb-4">
                        👋 مرحبا بك في مركز
                    </h1>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-6">
                        اقْرَأ وَارْتَقِ التعليمي 👨🏻‍🎓👩🏻‍🎓
                    </h2>
                    {process.env.NEXT_PUBLIC_PHARSE && (
                        <p className="mx-auto max-w-xl text-lg sm:text-xl text-gray-700 font-medium leading-relaxed">
                            {process.env.NEXT_PUBLIC_PHARSE}
                        </p>
                    )}
                </div>

                {/* Code Input Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-l from-primary to-secondary px-6 py-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="w-1 h-8 bg-white rounded-full"></div>
                            استخدم كود الطالب
                        </h3>
                    </div>
                    <div className="p-6">
                        <form 
                            className="flex flex-col gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (codeValue.length === 6 && !isLoading) {
                                    onSubmit(codeValue);
                                }
                            }}
                        >
                            <div className="relative">
                                <div className="w-full flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 transition-all focus-within:border-primary focus-within:bg-white focus-within:shadow-md">
                                    <div className="flex-shrink-0">
                                        <CodeIcon size="28px"/>
                                    </div>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        placeholder="أدخل كود الطالب (6 أرقام)"
                                        value={codeValue}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                            setCodeValue(value);
                                            setCodeInputError("");
                                        }}
                                        className="flex-1 bg-transparent focus:outline-none font-bold text-lg text-gray-900 placeholder:text-gray-400"
                                    />
                                    {codeValue.length > 0 && (
                                        <div className="flex-shrink-0 text-sm font-bold text-gray-500">
                                            {codeValue.length}/6
                                        </div>
                                    )}
                                </div>
                                {codeInputError && (
                                    <p className="mt-2 text-red-600 font-semibold text-sm flex items-center gap-2">
                                        <span>⚠️</span>
                                        {codeInputError}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={codeValue.length !== 6 || isLoading}
                                className={`
                                    w-full font-bold text-lg py-4 px-6 rounded-xl shadow-lg 
                                    transition-all duration-300 flex items-center justify-center gap-3
                                    ${isLoading 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : codeValue.length === 6
                                            ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }
                                `}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <Spinner />
                                        <span>جاري التحميل...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span>عرض النتيجة</span>
                                        <ArrowIcon color="#fff" size="24px"/>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CodeInput;