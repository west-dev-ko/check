import IUser from '../models/UserModel/IUser';
import ICategory from '../models/CategoryModel/iCategory';
export interface ResDefault {
     success: boolean;
     mes?: string;
     error?: any;
}

//Auth
export interface ResAuth extends ResDefault {
     accessToken?: string;
     refreshToken?: string;
     user?: IUser | null;
     allUser?: IUser[];
}
//Category
export interface Res_Category extends ResDefault {
     categogy?: ICategory;
}
//Middlewate Auth
export interface ResMiddlewareAuth extends ResDefault {}
// Token
export interface ResDataToken {
     success: boolean;
     error?: any;
     accessToken?: string;
     refreshToken?: string;
     decode?: any;
}
