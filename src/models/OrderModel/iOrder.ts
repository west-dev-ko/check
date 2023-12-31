import { Document } from 'mongoose';
interface IOrder extends Document {
     coffeeItem_id?: string;
     user_id?: string;
     quantity: number;
     createAt: number;
     updateAt: number;
}

export default IOrder;
