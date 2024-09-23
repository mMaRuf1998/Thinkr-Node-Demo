const express = require("express") 
const reviewModule = require("../controllers/reviews")
const router = express.Router({ mergeParams: true });
const {thinkrValidation, isLoggedIn , isReviewAuthor} = require("../middleware.js")
const flash = require('express-flash')
router.use(flash());

router.post('/', isLoggedIn , reviewModule.postReviews)

router.delete('/:reviewId', isLoggedIn , isReviewAuthor ,  reviewModule.deleteReviews)

module.exports = router ;