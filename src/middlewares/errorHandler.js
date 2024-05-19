const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ message: 'Invalid token or token has expired' });
    } else {
      next(err);
    }
  };
  
module.exports = errorHandler;