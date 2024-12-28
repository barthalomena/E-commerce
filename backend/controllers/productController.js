const Product = require("../models/productModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middelewares/catchAsyncError");
const APIfeatures = require("../utils/apiFeatures");

//get products -- api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
    const pagination = 2;
  const searchKeyword = new APIfeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(pagination); // searching

  const products = await searchKeyword.query;
  res.status(200).json({
    success: true,
    count: Product.length,
    products,
  });
});

//create products -- api/v1//product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user=req.user.id
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get single products  {{base_url}}/api/v1/product/
exports.getSingleproduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHandler("product not found", 400));
  } else {
    res.status(201).json({
      success: true,
      product,
    });
  }
});

//update product {{base_url}}/api/v1/product/
exports.updateproduct = catchAsyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete product
exports.deleteproduct = catchAsyncError(async (req, res, next) => {
  const products = await Product.findById(req.params.id);
  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Product not found!",
    });
  }
  await products.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Product deleted!",
  });
});
