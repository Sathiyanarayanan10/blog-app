import mongoose from "mongoose"
const connectDB = async ()=>{
    try{
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.MONGO);
        console.log('MongoDB connected')
    }catch(err){
        console.log(err)
    }
}
export default connectDB