const admin = require("firebase-admin");

async function setUserClaims(email) {
  const userRecord = await admin.auth().getUserByEmail(email);

  if (email === "admin@gmail.com") {
    await admin
      .auth()
      .setCustomUserClaims(userRecord.uid, { superAdmin: true });
    console.log("Super admin claims set for user:", email);
  }

  if (email === "mica@gmail.com") {
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log("Admin claims set for user:", email);
  }

  // vracam tog usera sa novim pravima i dalje njega prosledjujem
  return admin.auth().getUser(userRecord.uid);
}

function checkAdminClaims(customClaims) {
  return customClaims ? customClaims.admin || customClaims.superAdmin : false;
}

function checkSuperAdminClaims(customClaims) {
  return customClaims && customClaims.superAdmin ? true : false;
}
module.exports = {
  setUserClaims,
  checkAdminClaims,
  checkSuperAdminClaims,
};

