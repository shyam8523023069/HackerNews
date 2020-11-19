const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    serialNo: {
        type: Number,
        unique: true,
        required: true
    },
    news:{
        type: String,
        unique: true,
        required: true
    },
    title:{
        type: String,
        unique: true,
        required: true
        
    },
    body:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
        
    },
    url:{
        type: String,
        unique: true  
    },
    created_at:{
        type: Date,
        default:Date.now
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);