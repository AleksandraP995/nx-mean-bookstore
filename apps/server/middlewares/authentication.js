const admin = require("firebase-admin");
const authenticate = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
  
    if (!idToken) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.authId = decodedToken.uid; 
      next(); 
    } catch (error) {
      console.error('Error verifying ID token:', error);
      return res.status(401).send({ error: 'Unauthorized' });
    }
  };
  
  module.exports = authenticate;