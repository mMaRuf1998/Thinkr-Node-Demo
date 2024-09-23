const wrapAsync = require('../utils/wrapAsync.js') 
const { Review } = require('../model/reviews')
const { Product } = require('../model/products.js')

module.exports.postReviews = wrapAsync(async (req, res) => {
    const { rating, description } = req.body.review;

    const newreview = new Review({
        rating: rating,
        description: description,
        author : req.user 
    }
    );
    const { id } = req.params;
    const itemSelected = await Product.findById(id);
    console.log(itemSelected) ;
    itemSelected.reviews.push(newreview);
    await newreview.save();
    await itemSelected.save();
    //console.log(newItem)
    req.flash('success', 'Review Posted');
    res.redirect(`/list/${id}/details`);
})



module.exports.deleteReviews = wrapAsync(async (req, res) => { 
    const { id , reviewId } = req.params;
    const itemSelected = await Product.findById(id);
    const reviewSelected = await Review.findById(reviewId)

    await Product.findByIdAndUpdate( id , {$pull: { reviews : reviewId }} )  ;
    await Review.findByIdAndDelete(reviewId);

    console.log(itemSelected.reviews);
    req.flash('error', 'Review Deleted');
    res.redirect(`/list/${id}/details`);
}) 