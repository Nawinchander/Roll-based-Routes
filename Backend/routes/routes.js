/// routes

const { verifyToken, allowRoles } = require("./middleware/auth");

app.get("/admin", verifyToken, allowRoles("admin"), (req, res) => {
  res.send("Admin Dashboard");
});

app.get("/user", verifyToken, allowRoles("user", "admin"), (req, res) => {
  res.send("User Dashboard");
});

