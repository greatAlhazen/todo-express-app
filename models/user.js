import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordResetToken: {
        type:String,
    },
    passwordResetTokenExp:{
        type:Date
    }
});

//passport localize mongo
UserModel.plugin(passportLocalMongoose);

export default mongoose.model('User',UserModel);