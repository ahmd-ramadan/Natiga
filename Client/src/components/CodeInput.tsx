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
        <div className="mx-auto max-w-3xl text-center mt-4">
            <h1
                className="text-xl sm:text-2xl font-bold"
                // className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
                👋 مرحبا بك في مركز 
                <span className="block text-3xl sm:text-6xl font-extrabold text-primary mt-2git status">اقْرَأ وَارْتَقِ التعليمي 👨🏻‍🎓👩🏻‍🎓</span>
            </h1>

            <p className="mx-auto mt-8 max-w-xl sm:text-xl/relaxedfont-semibold text-lg">
                لعرض نتيجتك في امتحانات الترم الأول لعام 2024 - 2025 استخدم كود الطالب
            </p>

            <div className="w-full mt-8">
                <form className="flex flex-col gap-4">
                    <div className="w-full flex items-center gap-2 rounded-md border border-primary bg-white p-3 text-gray-700 shadow-sm transition focus:border-primary focus:outline-none focus:ring focus:ring-yellow-400">
                            <CodeIcon size="30px"/>
                            <input
                                type="code"
                                placeholder="أدخل كود الطالب"
                                value={codeValue}
                                onChange={(e) => {
                                    setCodeValue(e.target.value);
                                    setCodeInputError("");
                                }}
                                className="flex-1 focus:outline-none font-semibold text-secondary"
                            />
                    </div>
                    { codeInputError && <p className="text-red-600 font-semibold w-full">{codeInputError}</p> }

                    <button
                        type="submit"
                        disabled={codeValue.length != 6 || isLoading}
                        onClick={() => onSubmit(codeValue)}
                        style={{  cursor: codeValue.length != 6 || isLoading ? 'not-allowed' : 'pointer'}}
                        className={`${isLoading ? 'bg-transparent text-primary border border-primary' : 'bg-primary text-white'} font-semibold text-lg group flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto`}
                    >
                        { isLoading ? 
                            <div className="flex items-center gap-2">
                                <p className="text-primary">تحميل ...</p>
                                <Spinner />
                            </div>    
                        :
                            <>
                                <span>عرض النتيجة</span>
                                <ArrowIcon color="#fff" size="30px"/>
                            </>
                        }
                    </button>
                </form>
            </div>
        </div>  
    );
}
export default CodeInput;