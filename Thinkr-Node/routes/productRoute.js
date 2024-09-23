const express = require("express")
const { Product } = require('../model/products.js')  //
const wrapAsync = require('../utils/wrapAsync.js')  // 
const multer = require("multer")
const router = express.Router()
const {thinkrValidation,isAuthor,isLoggedIn} = require("../middleware.js")
const productModule = require("../controllers/products.js")

const {productModules} = require("../controllers/products.js")

const {storage ,cloudinary} = require("../cloudinary/cloud.js")

const upload = multer({storage : storage })

//Routes : 
router.route('/')
    .get(productModule.showProducts)

    .post(isLoggedIn , upload.array("product[image]") , thinkrValidation,  productModule.postNewProducts)
      

      /*
    .post(upload.single("product[image]"), (req,res)=>{
        console.log(req.file)
        res.send("wow !")
    })
    */

router.route("/:id/details")
    .get(productModule.productDetails)
    .patch(isLoggedIn , isAuthor , upload.array("product[image]"), productModule.patchEditProducts)

    /*
    .patch(upload.array("product[image]") , async (req,res)=> {
        console.log(req.body.deleteImage)
        for(img of req.body.deleteImage){
            await cloudinary.uploader.destroy(img , function(result) { console.log(result) })
        }

        res.send("Helo !")
        
    })
    */

//new
router.get('/new', isLoggedIn , productModule.addProducts)

router.get('/:id/edit', isLoggedIn , productModule.editProducts)
// Delete
router.delete('/:id/delete', isLoggedIn, isAuthor , productModule.deleteProducts)


module.exports = router ; 