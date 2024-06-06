import mongoose from "mongoose";

async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!); //! sign ensures that string will come definitely
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('MongoDB Connected');
    })
    connection.on('error',(err)=>{
        console.log('MongoDB Error');
        console.log(err);
        process.exit(1);
    })
  } catch (err) {
    console.log('Something went wrong');
    console.log(err)
  }
}
export default connect;