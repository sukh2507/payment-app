<<<<<<< HEAD

=======
>>>>>>> 4311aba (fetch balance resolved)
const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://sukhbirsinghsareen:lhNGQonJXIWWQ34y@cluster0.mfkvcb1.mongodb.net/paytm").then(console.log("connected to mongodb"))

const Userschema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    age:{type:Number, required:true},
    createdAt:{type:Date,default:Date.now}
})

const User=mongoose.model('user',Userschema)


const accountschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true,
        ref:"User"
    },
    balance:{
        type:Number,
        required:true
    }
})

const transactionSchema = new mongoose.Schema({
    from: {
        
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            }
        
    },
    to: {
        
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            }
        
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Transactions=mongoose.model('transactions',transactionSchema)

const Account=mongoose.model('accounts',accountschema)

module.exports={
    User,Account,Transactions
}
