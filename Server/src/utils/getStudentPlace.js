const Material = require("../models/Material");

const getStudentPlace = async ({ student, yearGrades }) => {
    const totalStdGrades = student?.ar + student?.en + student?.ma + student?.so || 0 + student?.sc || 0;
    const totalGrades = 0;
    return 0;
}