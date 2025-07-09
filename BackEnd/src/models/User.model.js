import { compare, genSalt, hash } from "bcryptjs";
import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
         type:String,
        required:true,
        unique: true
    },
    password:{
         type:String,
        required:true,
        minlength:6
    },
     bio:{
         type:String,
        default:""
        },
    profilePic:{
       type:String,
        default:"" 
    },
    nativeLanguage:{
    type:String,
    default:""
    },
    learningLanguage:{
    type:String,
    default:""
    },
    location:{
    type:String,
    default:""
    },
    isOnboarded:{
    type:Boolean,
    default:false
    },
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{ timestamps: true})


UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.comparePassword = async function (enteredPassword){
    const isMatchedPassword = await compare(enteredPassword, this.password);
    return isMatchedPassword;
}

const User = model("User", UserSchema);

export default User; 