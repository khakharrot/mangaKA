const User=require('../Models/User')


const isAdmin = (req, res, next) => {
    if (req.User && req.User.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  };

module.exports=isAdmin