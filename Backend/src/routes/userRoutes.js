router.get(
  "/admin",
  verifyToken,
  allowRoles("admin"),
  getAdminData
);