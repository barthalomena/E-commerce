const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;

  if (process.env.NODE_ENV == "development") {
    res.status(err.statuscode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new ErrorHandler(message);
    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message);
    }
    if (err.name == "CastError") {
      message = `Resource Not Found: ${err.path}`;
      error = new ErrorHandler(message);
    }
    //duplicate error
if(err.code==11000){
  let message = `Duplicate ${Object.keys(err.keyValue)} error`
  error = new ErrorHandler(message);

}
//jsonwebtoke error
if(err.code=='JSONWebTokenError'){
  let message = `JSON Web Token is invalid try again`
  error = new ErrorHandler(message);

}
//Token expire  error
if(err.code=='TokenExpiredError'){
  let message = `JSON Web Token is Expired try again`
  error = new ErrorHandler(message);

}
    res.status(err.statuscode).json({
      success: false,
      message: error.message || "Internal server Error",
      //    message // Array
    }); 
  }
};
