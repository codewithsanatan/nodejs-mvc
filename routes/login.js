const express = require("express");

const {
  registerView,
  loginView,
  registerUser,
  loginUser,
} = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get("/", loginView);
router.get("/login", loginView);
router.get("/register", registerView);
//Dashboard
router.get("/dashboard", protectRoute, dashboardView);
// Logout route
router.get('/logout', (req, res) => {
  // req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;