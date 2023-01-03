import mongoose from 'mongoose';


// database configuration
export const connectDatabase = (url) =>{
    mongoose.connect(url,{
        useNewUrlParser: true,
    }).then(
        (data) =>{
            console.log(`database connection opened in ${data.connection.host}`)
        }
    ).catch(
        (err) =>{
        console.log(err);
    })
};

