const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async function (req, res, next) {
  console.log('- in MIDDLEWARE')
  try {
    const token = req.header('Authorization').replace('Bearer', '').trim();
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    })

    console.log(' ----- USER ---- ', user);

    if (!user) {
      throw new Error() // no message, next catch will do the job
    }

    req.token = token;
    req.user = user;

    next(); // user provided correct token
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: 'Please authenticate' })
  }
}

module.exports = auth;