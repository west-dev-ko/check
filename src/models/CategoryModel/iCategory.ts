import { Document } from 'mongoose';
interface ICategory extends Document {
     title: string;
     coffeeitems: string[];
}
export default ICategory;
