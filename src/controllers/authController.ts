import { Request, Response } from 'express';
import AuthService from '../Services/authService';
import { StatusCode } from '../common/statusCode';
import CheckId from '../helpers/checkIdHelper';
import { ResAuth } from '../helpers/interfacesHelper';

class AuthCtr {
     Register = async (req: Request, res: Response): Promise<any> => {
          const body: { email: string; password: string; phonenumber: string } =
               req.body;
          const userif: ResAuth = await new AuthService().register(body);
          if (userif.success) {
               const resCtrSuccess: ResAuth = {
                    success: true,
                    mes: 'đăng kí thành công',
                    user: userif.user,
               };
               return res.status(StatusCode.CREATED), res.json(resCtrSuccess);
          } else if (!userif.error) {
               const resCtrFail: ResAuth = {
                    success: false,
                    mes: 'email đã tồn tại',
               };
               return res.status(StatusCode.BAD_REQUEST), res.json(resCtrFail);
          } else {
               const resCtrError: ResAuth = {
                    success: false,
                    mes: 'đã xảy ra lỗi',
                    error: userif.error,
               };
               return (
                    res.status(StatusCode.SERVER_ERROR), res.json(resCtrError)
               );
          }
     };
     Login = async (req: Request, res: Response): Promise<any> => {
          const body: { email: string; password: string } = req.body;
          const responseLogin: ResAuth = await new AuthService().login(body);
          if (responseLogin?.success) {
               const resLoginSuccess: ResAuth = {
                    success: true,
                    mes: 'đăng nhập thành công',
                    accessToken: responseLogin.accessToken,
                    refreshToken: responseLogin.refreshToken,
                    user: responseLogin.user,
               };
               return res.status(StatusCode.OK), res.json(resLoginSuccess);
          } else if (!responseLogin?.error) {
               const resLoginWrongInfo: ResAuth = {
                    success: false,
                    mes: 'sai thông tin đăng nhập vui lòng đăng nhập lại',
               };
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json(resLoginWrongInfo)
               );
          } else {
               const resLoginError: ResAuth = {
                    success: false,
                    mes: 'có lỗi xảy ra',
                    error: responseLogin.error,
               };
               return (
                    res.status(StatusCode.SERVER_ERROR), res.json(resLoginError)
               );
          }
     };
     Refresh = async (req: Request, res: Response): Promise<any> => {
          const body: { refreshToken: string } = req.body;
          const responseRefreshToken: ResAuth = await new AuthService().refresh(
               body
          );
          if (responseRefreshToken.success) {
               const resRefreshTokenSucess: ResAuth = {
                    success: true,
                    mes: 'refreshToken thành công',
                    accessToken: responseRefreshToken.accessToken,
               };
               return (
                    res.status(StatusCode.OK), res.json(resRefreshTokenSucess)
               );
          } else if (responseRefreshToken.user == null) {
               const resTokenNotFound: ResAuth = {
                    success: false,
                    mes: 'Token bị gỡ bỏ',
               };
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json(resTokenNotFound)
               );
          } else if (!responseRefreshToken.error) {
               const resTokenExpired: ResAuth = {
                    success: false,
                    mes: 'Token hết hạn',
               };
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json(resTokenExpired)
               );
          } else {
               const resError: ResAuth = {
                    success: false,
                    mes: ' xảy ra lỗi',
                    error: responseRefreshToken.error,
               };
               return res.status(StatusCode.SERVER_ERROR), res.json(resError);
          }
     };
     getAllUser = async (req: Request, res: Response): Promise<any> => {
          const responseAllUser: ResAuth = await new AuthService().getalluser();
          if (responseAllUser.success) {
               const resAllUserSuccess: ResAuth = {
                    success: true,
                    mes: 'lấy alluser thành công',
                    allUser: responseAllUser.allUser,
               };
               return res.status(StatusCode.OK), res.json(resAllUserSuccess);
          } else {
               const resAllUserError: ResAuth = {
                    success: false,
                    mes: 'xảy ra lỗi',
                    error: responseAllUser.error,
               };
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json(resAllUserError)
               );
          }
     };
     deleteUser = async (
          req: Request<{ id: string }>,
          res: Response
     ): Promise<any> => {
          const param: { id: string } = req.params;
          CheckId(param.id);
          const resDeleteUser: ResAuth = await new AuthService().deleteUser(
               param.id
          );
          if (resDeleteUser.success) {
               const resDeleteSuccess: ResAuth = {
                    success: true,
                    mes: 'xóa user thành công',
                    user: resDeleteUser.user,
               };
               return res.status(StatusCode.OK), res.json(resDeleteSuccess);
          } else {
               const resDeleteError: ResAuth = {
                    success: false,
                    mes: 'xảy ra lỗi',
                    error: resDeleteUser.error,
               };
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json(resDeleteError)
               );
          }
     };
}

export default AuthCtr;
