const XLSX = require("xlsx");
const path = require("path");
const Student = require("../models/Student");
const CustomError = require("../utils/customError");
const Material = require("../models/Material");

const readSheetData = (fileName) => {
  const filePath = path.join(__dirname, "../../data/", fileName);
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  return sheetData;
};

module.exports.natigaCtrl = {
  readStudentsDataFromSheet: async (req, res, next) => {
    //! Read students data from sheet
    const studentsData = readSheetData(process.env.STUDENTS_FILE_NAME);

    //! Validte student data
    let studentsSheetData = [];
    for (const row of studentsSheetData) {
      const studentData = {
        code: row.code,
        name: row.name,
        year: row.year,
        ar: row?.ar || 0,
        en: row?.en || 0,
        ma: row?.ma || 0,
        sc: row?.sc || 0,
        so: row?.so || 0,
      };
      studentsData.push(studentData);
    }

    //! Add students data to database
    for (const student of studentsData) {
      if (student?.code) {
        const studentExist = await Student.findOne({ code: student.code });
        if (!studentExist) {
          await Student.create(student);
        } else {
          await Student.updateOne({ code: student.code }, student);
        }
      }
    }

    res.status(200).json({
      success: true,
      msg: "File uploaded and processed successfully.",
    });
  },

  readMatrielsDataFromSheet: async (req, res, next) => {
    //! Read students data from sheet
    const materialsData = readSheetData(process.env.MATERIALS_FILE_NAME);

    //! Validte student data
    let materialsSheetData = [];
    for (const row of materialsSheetData) {
      const materialData = {
        year: row.year,
        percent: row.percent,
        ar: row?.ar || 0,
        ma: row?.ma || 0,
        en: row?.en || 0,
        sc: row?.sc || 0,
        so: row?.so || 0,
      };
      materialsData.push(materialData);
    }

    //! Add students data to database
    for (const material of materialsData) {
      if (material?.year) {
        const materialExist = await Material.findOne({ year: material.year });
        if (!materialExist) {
          await Material.create(material);
        } else {
          await Material.updateOne({ year: material.year }, material);
        }
      }
    }

    res.status(200).json({
      success: true,
      msg: "File uploaded and processed successfully.",
    });
  },

  getStudentGrades: async (req, res, next) => {
    const { stdCode: code } = req.query;
    const student = await Student.findOne({ code });
    if (!student) {
      return next(
        new CustomError({
          msg: "كود الطالب غير صحيح",
          cause: 404,
        })
      );
    }

    const materialsForYear = await Material.findOne({ year: student.year });
    if (!materialsForYear) {
      return next(
        new CustomError({
          // msg: "",
          cause: 400,
        })
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
    };

    res.status(200).json({
      success: true,
      msg: "",
      data: response,
    });
  },
};
