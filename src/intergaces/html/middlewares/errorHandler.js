const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ message: 'Invalid token or token has expired' });
    } else {
        res.status(500).json({ message: err.details[0].message });
    }
  };
  
module.exports = errorHandler;