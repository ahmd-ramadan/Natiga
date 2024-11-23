export const yearsName = [
    "الاول الأبتدائي",
    "الثاني الإبتدائي",
    "الثالث الإبتدائي",
    "الرابع الإبتدائي",
    "الخامس الإبتدائي",
    "السادس الإبتدائي",
    "الأول الإعدادي",
    "الثاني الإعدادي",
    "الثالث الإعدادي",
];

export const getYearName = (year: number): string => {
    return yearsName[year - 1];
}