
const Product =require('../models/productModel')

//get products -- api/v1/products
exports.getProducts = async(req, res, next)=>{
    const products = await Product.find()
res.status(200).json({
    success:true,
    count:Product.length,
    products
})
}
//create products -- api/v1//product/new
exports.newProduct=async(req,res,next)=>{
const product = await Product.create(req.body);
res.status(201).json(
    {
        success: true,
        product
    }
)
}

//get single products  {{base_url}}/api/v1/product/
exports.getSingleproduct=async(req,res,next)=>{
   const product = await Product.findById(req.params.id)
if(!product){
    return res.status(404).json({
        success:false,
        message: "Product not found"
    })
    res.status(201).json({
        success:true,
        product
    })
}
}

//update product {{base_url}}/api/v1/product/
exports.updateproduct=async(req,res,next) =>{
    let product = Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
        
    })
    res.status(200).json({
        success:true,
        product
    })

}

//delete product
exports.deleteproduct=async(req,res,next)=>{
    const products = await Product.findById(req.params.id);
    if(!products){
        return res.status(404).json({
            success:false,
            message: "Product not found!"
        });
    }
    await products.remove();

    res.status(200).json({
        success:true,
        message:"Product deleted!"
    })
}