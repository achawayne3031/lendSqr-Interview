const express = require("express");
const router = express.Router();
const AccountController = require("./../../dist/src/controller/AccountController");

const app = express();
app.use(express.json());

router.post("/api/account/create", AccountController.createAccount);
router.post("/api/account/fund", AccountController.fundAccount);
router.post("/api/account/withdraw", AccountController.withdrawal);
router.post("/api/account/transfer", AccountController.transfer);

router.get("/", (req, res) => {
  res.json({
    hello: "hi! test",
  });
});

module.exports = router;
