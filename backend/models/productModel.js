const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter product name"],
trim:true,
maxLength:[500,"Product name cannot exceed charcters"]
    },
    price:{
        type:Number,
        
        default:0.0
    },
    description:{
        type:String,
        required:[true, "Please enter product description"]
    },
    ratings:{
        type:String,
        default: 0
    },
    images:[
        {
        image:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"please enter your category"],
        enum:{
            values:[
                'electronics',
                'mobile phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/health',
                'Sports',
                'Outdoor',
                'Home'
        ],
        message:"please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"please enter product seller"], 
      },
      stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[20, 'product stock cannot exceed 20']
      },
      numberOfReviews:{
        type:Number,
        default:0
      },
      reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
      ],
      createdAt:{
        type:Date,
default:Date.now
    }

})
let schema = mongoose.model('Product',productSchema)

module.exports=schema