class CustomError extends Error {
  constructor(options, message = "") {
    super(message);
    this.msg = options.msg;
    this.cause = options.cause;
  }
}

module.exports = CustomError;
