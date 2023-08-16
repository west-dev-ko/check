const mongoose = require('mongoose');
const Connect = async (): Promise<void> => {
     try {
          const conn = await mongoose.connect(
               `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
          );
          console.log('connect db successfully');
     } catch (error: unknown) {
          if (typeof error === 'string') {
               throw new Error(error);
          } else {
               throw new Error('khong the ket noi database');
          }
     }
};
export default Connect;
