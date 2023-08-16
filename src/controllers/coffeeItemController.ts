import express, { Request, Response } from 'express';
import CoffeeItemService from '../Services/coffeeItemService';
// import CategoryModel from '../models/CategoryModel';
import { StatusCode } from '../common/statusCode';
import CheckId from '../helpers/checkIdHelper';
const CoffeeItem = new CoffeeItemService();
class CoffeeITemCtr {
     createCoffee = async (req: Request, res: Response) => {
          const body: {
               name: string;
               price: number;
               volume: number;
               stars: number;
               image: string;
               desc: string;
               category?: string;
          } = req?.body;
          const createCoffee = await CoffeeItem.createCoffee(body);
          return (
               res.status(StatusCode.CREATED),
               res.json({
                    success: true,
                    mes: 'them coffee thanh cong',
                    coffee: createCoffee?.coffeeCreaeted,
               })
          );
     };
     updateCoffee = async (req: Request, res: Response) => {
          const body: {
               name: string;
               price: number;
               volume: number;
               stars: number;
               image: string;
               desc: string;
               category?: string;
          } = req.body;
          const { id } = req.params;
          CheckId(id);
          const updatedCoffee = await CoffeeItem.updateCoffee({ id: id }, body);
          if (updatedCoffee?.coffee == null) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'khong the update Coffee',
                    })
               );
          } else {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'cap nhat thanh cong',
                         coffee: updatedCoffee.coffee,
                    })
               );
          }
     };
     deleteCoffee = async (req: Request, res: Response) => {
          const { id } = req?.params;
          CheckId(id);
          const deleteCoffee = await CoffeeItem.deleteCoffee({
               id: id,
          });
          console.log(deleteCoffee);
          if (deleteCoffee.success) {
               return res.status(StatusCode.OK), res.json(deleteCoffee);
          } else if (deleteCoffee.Coffee == null) {
               return res.status(StatusCode.NOT_FOUND), res.json(deleteCoffee);
          }
          return res.status(StatusCode.SERVER_ERROR), res.json(deleteCoffee);
     };
     getAllCoffee = async (req: Request, res: Response) => {
          const allCoffee = await CoffeeItem.getAllCoffee();
          return (
               res.status(StatusCode.OK),
               res.json({
                    mes: 'get Coffee thanh cong',
                    allCoffee: allCoffee,
                    success: true,
               })
          );
     };
     getCoffeeById = async (req: Request, res: Response) => {
          const { id } = req.params;
          CheckId(id);
          const CoffeeByid = await CoffeeItem.getCoffeeById(id);
          return (
               res.status(StatusCode.OK),
               res.json({
                    success: true,
                    mes: 'lay coffee thanh cong',
                    CoffeeByid: CoffeeByid,
               })
          );
     };
     findCoffee = async (req: Request, res: Response) => {
          const keyword: any = req?.query.keyword;
          if (!keyword) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'tu khoa chua duoc truyen len',
                    })
               );
          }
          const Coffee = await CoffeeItem.SearchCoffee(keyword);
          if (Coffee?.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         mes: 'tìm thành công',
                         coffee: Coffee.coffee,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'Không có sản phẩm phù hợp',
                    })
               );
          }
     };
     likeCoffee = async (req: Request, res: Response) => {
          const user_id: string = (req as any).user._id;
          const { coffee_id } = req.params;
          CheckId(coffee_id);
          const response = await CoffeeItem.likeCoffee(user_id, {
               coffee_id: coffee_id,
          });
          console.log(response);
          if (!response?.success) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: response?.mes,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         userliked: response.userLiked,
                         success: true,
                         mes: response.mes,
                    })
               );
          }
     };
     unlikeCoffee = async (
          req: Request<{ coffee_id: string }>,
          res: Response
     ) => {
          const user_id: string = (req as any).user._id;
          console.log(user_id);
          const params: { coffee_id: string } = req.params;
          CheckId(params.coffee_id);
          const response = await CoffeeItem.unlikeCoffee(user_id, params);
          if (response?.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         user_unlike: response.User_unlike,
                         success: true,
                         mes: response.mes,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: response?.mes,
                    })
               );
          }
     };
     getCoffeeLiked = async (req: Request, res: Response) => {
          const user_id: string = (req as any).user._id;
          const response = await CoffeeItem.getCoffeeLiked(user_id);
          if (!response?.success) {
               return (
                    res.status(StatusCode.NOT_FOUND),
                    res.json({
                         success: false,
                         mes: 'chưa có coffee được like',
                    })
               );
          } else {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'thành công',
                         listCoffeeLiked: response.listCoffeeLike,
                    })
               );
          }
     };
}
export default CoffeeITemCtr;
