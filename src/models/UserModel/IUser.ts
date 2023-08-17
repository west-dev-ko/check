import { Document } from 'mongoose';
interface IUser extends Document {
     email: string;
     password: string;
     phonenumber: string;
     role: string;
     likedCoffeeItem: string[];
     avatar: string;
     orders: string[];
     reftoken: String;
}
export default IUser;
