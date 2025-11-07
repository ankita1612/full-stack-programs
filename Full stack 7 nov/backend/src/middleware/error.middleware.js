exports.notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: 'Not Found' });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};
