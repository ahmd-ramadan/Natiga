module.exports.asyncHandler = (controller) => {
  return (req, res, next) => {
    if (typeof controller !== "function") {
      // console.error('The controller is not a function:', controller);
      return next();
    }
    controller(req, res, next).catch((error) => {
      next(error);
    });
  };
};
