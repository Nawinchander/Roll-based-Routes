// router.get(
//   "/admin",
//   verifyToken,
//   allowRoles("admin"),
//   getAdminData
// );



const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

router.get("/admin", verifyToken, allowRoles("admin"), (req, res) => {
  res.json({ msg: "Admin data" });
});

router.get("/user", verifyToken, (req, res) => {
  res.json({ msg: "User data" });
});

module.exports = router;