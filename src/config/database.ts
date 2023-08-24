const mongoose = require('mongoose');
const aliasConnectionString =
     'mongodb+srv://nguyenkhangbn8501:khangbn2k1@coffee.hd94kae.mongodb.net/OrderCoffee?retryWrites=true&w=majority';

const connectDb = async () => {
     try {
          await mongoose.connect(aliasConnectionString, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               connectTimeoutMS: 30000, // 10 seconds
          });
          console.log('Connected to MongoDB alias');
     } catch (error) {
          console.error('Error connecting to MongoDB alias:', error);
     }
};
export default connectDb;
