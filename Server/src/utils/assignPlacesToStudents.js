module.exports.assignPlacesToStudents = async(yearsStudentsArray) => {
    const sortedYearsStudentsArry = yearsStudentsArray.map(( yearStudentsArray) => {
        //! Sort yearStudentsArray descending based on total grades
        const sortedYearStudentsArray = yearStudentsArray.sort((stdX, stdY) => {
            return getTotalStdGrades(stdY) - getTotalStdGrades(stdX);
        });

        //! Assign place to each student
        let place = 0;
        prevStudentGrades = -1;
        const addedPlacesToStudents = sortedYearStudentsArray.map((student) => {
            currStudentGrades = getTotalStdGrades(student);
            if (prevStudentGrades === currStudentGrades) return { ... student, place };
            prevStudentGrades = currStudentGrades;
            return { ... student, place: ++ place };
        })

        return addedPlacesToStudents;
    })
    // console.log(sortedYearsStudentsArry[7]);
    return sortedYearsStudentsArry;
}

const getTotalStdGrades = (student) => {
    return student?.ar + student?.en + student?.ma + student?.sc + student?.so; 
}