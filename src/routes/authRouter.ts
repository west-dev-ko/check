import express from 'express';
import Endpoint from '../common/endpoint';
import AuthCtr from '../controllers/authController';
import AuthMiddleware from '../middlewares/authMiddleware';
const AuthRouter = express.Router();
const authCtr = new AuthCtr();
const middlewaresAuth = new AuthMiddleware();
AuthRouter.post(Endpoint.REGISTER, authCtr.Register);
AuthRouter.post(Endpoint.LOGIN, authCtr.Login);
AuthRouter.post(
     Endpoint.REFRESH_TOKEN,
     middlewaresAuth.VerifyAccount,
     authCtr.Refresh
);
AuthRouter.get(
     Endpoint.GET_ALLUSER,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     authCtr.getAllUser
);
AuthRouter.delete(
     Endpoint.DELETE_USER,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     authCtr.deleteUser
);
export default AuthRouter;
