//                  imports
// --------------------------------------------------------------//

import express,{Router} from 'express'

const router:Router= express.Router()

import {getall_blog,create_blog,update_blog,get_single_blog,delete_blog} from '../controller/admin_blog_controller'

import {getall_contact,create_contact, get_single_contact, delete_contact} from '../controller/admin_contact_controller'

import {getall_user, get_single_user, update_user, delete_user} from '../controller/admin_user_controller'

import verfy_token from '../verify_token/verify_token'
//                middleware
// -----------------------------------------------------------//
router.use(express.json())


// routes for blogs

router.route('/blog').get(verfy_token,getall_blog).post(create_blog)

router.route('/blog/:id').get(get_single_blog).patch(update_blog).delete(delete_blog)

//routes for the contact

router.route('/contact').get(getall_contact).post(create_contact)
router.route('/contact/:id').get(get_single_contact).delete(delete_contact)

// routes for User

router.route('/user').get(getall_user)
router.route('user/id').get(get_single_user).delete(delete_user).patch(update_user)
// export routes---------------------------------------------//

export default router 