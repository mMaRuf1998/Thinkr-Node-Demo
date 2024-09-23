const wrapAsync = require('../utils/wrapAsync.js') 
const { Product } = require('../model/products.js');

const User = require('../model/users.js');
const { array } = require('joi');
const {cloudinary} = require("../cloudinary/cloud.js")

module.exports.showProducts = wrapAsync(async function (req, res) {
    const { sorted } = req.query;
    let itemList;
    if (sorted === "aesc") {
        itemList = await Product.find({}).sort({ price: 1 });
    }
    else if (sorted === "desc") {
        itemList = await Product.find({}).sort({ price: -1 });
    }
    else {
        itemList = await Product.find({});
    }

    res.render("home", { itemList });
})

module.exports.addProducts = function (req, res) {
    res.render("new");
}


module.exports.productDetails = wrapAsync(async (req, res) => {

    const { id } = req.params;
    const itemSelected = await Product.findById(id).populate({path:'reviews' , populate : {path: "author"}}).populate("author");

    //const author = await User.findById()
    
    //console.log(req.user._id)

    res.render("details", { itemSelected });

})

module.exports.editProducts = wrapAsync(async function (req, res) {
    
    const { id } = req.params;
    const itemSelected = await Product.findById(id);
    res.render("edit", { itemSelected });
})

module.exports.postNewProducts =  wrapAsync(async function (req, res) {
    let { name, qty, u_price ,category } = req.body.product
    let price = u_price * qty;

    console.log(req.files)

    const newItem = new Product(
        {
            name: name,
            qty: qty,
            u_price: u_price,
            price: price , 
            category : category ,
            author : req.user ,
        }
    );
    
    for(img of req.files)
    {
        newItem.images.push({
            url:img.path ,
            filename : img.filename
        })
    }

    //console.log(newItem)
    await newItem.save();
   // console.log(newItem)
    req.flash('success', 'Product Added Successfully');
    res.redirect("/list");
})

module.exports.patchEditProducts = wrapAsync(async function (req, res) {
    const { id } = req.params;
    let { name, qty, u_price } = req.body.product
    let price =  (qty*u_price) ; 
    
    let image = []

    for(img of req.files)
    {
        image.push({ url : img.path ,
            filename : img.filename
        })
    }

    let itemSelected = await Product.findById(id) ;

    for(img of itemSelected.images)
            {
                image.push(img);
            }
            
        if(req.body.deleteImage){
        for(img of req.body.deleteImage){
            await cloudinary.uploader.destroy(img , function(result) { console.log(result) })
            // Delete from mongo
            image = image.filter(
                function(el) { 
                    return el.filename !== img ; 
                }
            );
                
            }
        }
        
       await Product.findByIdAndUpdate(id, {
            name : name ,
            qty : qty ,
            u_price : u_price ,
            price : u_price*qty ,
            images : image
        }) 

    req.flash('info', 'Changed Successfully');
    res.redirect("/list");
})



    
module.exports.deleteProducts =  wrapAsync(async function (req, res) {
    const { id } = req.params;
    let itemSelected = await Product.findByIdAndDelete(id);
    




    //req.flash('error', 'Product Deleted Successfully');
    res.redirect("/list");

})


   



