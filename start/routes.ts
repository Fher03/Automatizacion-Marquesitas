/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const SessionController = () => import('#controllers/sessions_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductsController = () => import('#controllers/products_controller')
const OrdersController = () => import('#controllers/orders_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router.on('/').render('pages/home').as('dashboard').use(middleware.auth())

router.get('/login', [SessionController, 'index'])
router.post('/login', [SessionController, 'store']).as('login')
router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())

router.get('/pedidos', [OrdersController, 'index']).as('orders').use(middleware.auth())
router.get('/productos', [ProductsController, 'index']).as('products').use(middleware.auth())
