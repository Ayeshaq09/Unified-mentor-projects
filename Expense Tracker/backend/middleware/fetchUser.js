const jwt = require("jsonwebtoken");

// verify user using token
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
