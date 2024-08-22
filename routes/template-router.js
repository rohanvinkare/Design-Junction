const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware.js");

const checkPermission = require("../middlewares/check-permission-middleware.js")
const router = express.Router();
router.use(express.static("public"));


// Route handler for /food
// router.get("/food", sessionAuthMiddleware,authMiddleware, (req, res) => {
//   res.render("food");
// });


//============================================== Food =========================================================
// Route handler for /food
router.get("/food", authMiddleware, checkPermission, (req, res) => {
  res.render("food");
});



// Route handler for /food/restaurant
router.get("/food/restaurant", authMiddleware, (req, res) => {
  res.render("restaurant");

});

// Route handler for /food/coffee
router.get("/food/restaurant/code", authMiddleware, (req, res) => {
  res.render("./code-giver/restaurent-code");
});



// Route handler for /food/coffee
router.get("/food/coffee", authMiddleware, (req, res) => {
  res.render("coffee");
});

// Route handler for /food/coffee
router.get("/food/coffee/code", authMiddleware, (req, res) => {
  res.render("./code-giver/coffee-code");
});

//============================================== travel =========================================================

router.get("/travel", authMiddleware, checkPermission, (req, res) => {
  res.render("travel");
});

router.get("/blog", authMiddleware, checkPermission, (req, res) => {
  res.render("blog");
});


router.get("/ecommerce", authMiddleware, (req, res) => {
  res.render("ecommerce");
});

router.get("/finance", authMiddleware, (req, res) => {
  res.render("finance");
});

router.get("/portfolio", authMiddleware, (req, res) => {
  res.render("portfolio");
});

router.get("/healthcare", authMiddleware, (req, res) => {
  res.render("healthcare");
});

router.get("/education", authMiddleware, (req, res) => {
  res.render("education");
});


// Route handler for /food/restaurant
router.get("/finance/:id", authMiddleware, (req, res) => {
  res.render("restaurant");
});


// Route handler for /login
router.get("/login", authMiddleware, (req, res) => {
  res.render("login");
});



//=================================Sujal Added routes===============

router.get("/travel/adventure", authMiddleware, (req, res) => {
  res.render("adventure");
});

router.get("/education/school", authMiddleware, (req, res) => {
  res.render("school");
});

router.get("/healthcare/doclab", authMiddleware, (req, res) => {
  res.render("doclab");
});

router.get("/blog/ghostwind", authMiddleware, (req, res) => {
  res.render("ghostwind");
});

router.get("/ecommerce/easydeals", authMiddleware, (req, res) => {
  res.render("easydeals");
});


router.get("/privacyPolicy", (req, res) => {
  res.render("policy");
  // res.json({ message: "Privacy Policy" });
});

router.get("/terms", (req, res) => {
  res.render("terms");
});



//============================Prajwal Changes Part =========================================

const Change = require('../model/change-template-code-model.js');


router.post('/food/coffee/insertChange', async (req, res) => {
  try {
    const { property, value } = req.body;



    var obj = {
      property: property, value: value
    }

    const updated = new Change(obj);
    const updatedData = await updated.save()



    res.sendStatus(200)

  } catch (error) {
    console.error('Error inserting change into database:', error);
    res.sendStatus(500);
  }
});

router.get('/food/coffee/insertChange', async (req, res) => {
  try {
    const changes = await Change.find();

    // res.json({msg:"Data Fetched Successfully",data:changes});
    res.render("coffee");
  } catch (error) {
    console.error('Error retrieving changes from database:', error);
    res.sendStatus(500);
  }
});





module.exports = router;
