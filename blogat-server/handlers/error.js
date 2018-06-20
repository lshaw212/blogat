function errorHandler(error, request, response, next){
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something has gone wrong."
    }
  });
}

module.exports = errorHandler;