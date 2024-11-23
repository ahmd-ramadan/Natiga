const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const natigaRouter = require("./routes/natiga.routes");
const CustomError = require("./utils/customError");

module.exports.startApp = ({ app, express }) => {
  //! Connect database
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database is running ^_^");
    })
    .catch((err) => {
      console.log("DataBase error", err);
    });

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  //! Routes handles
  app.use("/api", natigaRouter);

  //! Not valid routes
  app.all("*", (req, res, next) => {
    return next(
      new CustomError({
        msg: "الصفحة غير موجودة",
        cause: 404,
      })
    );
  });

  //! Error handles
  app.use((error, req, res, next) => {
    const statusCode = error?.cause || 500;

    console.error(error.stack);

    const response = {
      success: false,
      msg: error.msg || "فشلت العملية",
    };

    if (process.env.NODE_ENV === "development") {
      response.stack = error.stack;
    }

    return res.status(statusCode).json(response);
  });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`App runing on port ${PORT} ...`);
  });
};
