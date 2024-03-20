// ---------------imports----------------------------//

import express, { Router,Request,Response } from "express";

const router:Router=express.Router()


import {verf_user,create_user} from '../controller/user_login_controller'


// ---------------Middleware------------------------//

router.use(express.json())

// ---------------routes---------------------------//

router.route('/login').post(verf_user)

router.route('/Registration').post(create_user)


//--------------export routers--------------------//

export default router