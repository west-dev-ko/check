enum Endpoint {
     REGISTER = '/register',
     LOGIN = '/login',
     REFRESH_TOKEN = '/refresh',
     GET_ALLUSER = '/getalluser',
     DELETE_USER = '/deleteuser/:id',
     FIND_COFFEE = '/search',
     ADD_COFFEE = '/addcoffee',
     ADD_CATEGORY = '/addcategory',
     DELETE_COFFEE = '/deletecoffee/:id',
     GET_ALL_COFFEE = '/getallcoffee',
     UPDATE_COFFEE = '/updatecoffee/:id',
     GET_COFFEE_BY_ID = '/getcoffeebyid/:id',
     LIKE_COFFEE = '/likecoffee/:coffee_id',
     UNLIKE_COFFEE = '/unlikecoffee/:coffee_id',
     UPDATE_CATEGORY = '/updatecategory/:category_id',
     DELETE_CATEGORY = '/deletecategory/:category_id',
     GET_ALL_CATEGORY = '/getallcategory',
     GET_COFFEE_LIKED = '/getcoffeeliked',
}
export default Endpoint;
