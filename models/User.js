const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const Joi = require("joi");

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
       match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    role: {
      type: String,
      enum: ["superadmin-0", "admin-1", "employee-2"]
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdDate: {
      type : Date,
      required : true
    },
    updatedDate: {
      type: Date,
      required:true
    }
}

);


UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('user', UserSchema);


  
  exports.User = User; 


