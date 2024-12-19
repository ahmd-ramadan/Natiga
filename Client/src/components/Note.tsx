
const Note = () => {
    return (
        <div className="w-full sm:w-3/4 lg:w-1/2 mx-auto border-2 border-primary p-4 mt-10 rounded-xl flex items-center justify-center flex-col gap-8">
            <p className="text-lg md:text-4xl font-bold text-red-600">
                تم إنتهاء فترة عرض النتيجة 😎
            </p>
            <div className="loader mx-auto"></div>
            {/* 🔒 */}
            <p className="text-lg md:text-2xl font-bold text-[#064537] text-center">
                ترقبوا عرض نتيجة منتصف العام 2024 - 2025 للمرحلة الإبتدائية والإعدادية قريبا 🙈🙌
            </p>
            
        </div>
    );
}

export default Note;