const SessionController = () => import('#controllers/sessions_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const InventoryController = () => import('#controllers/inventory_controller')
const ProductsController = () => import('#controllers/products_controller')
const OrdersController = () => import('#controllers/orders_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router.on('/').render('pages/dashboard').as('dashboard').use(middleware.auth())

router.get('/login', [SessionController, 'index'])
router.post('/login', [SessionController, 'store']).as('login')
router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())

router
  .group(() => {
    router.get('/', [OrdersController, 'index']).as('orders').use(middleware.auth())
    router.get('/create', [OrdersController, 'create']).as('orders.create').use(middleware.auth())
  })
  .prefix('/pedidos')

router
  .group(() => {
    router.get('/', [ProductsController, 'index']).as('products').use(middleware.auth())
  })
  .prefix('/productos')

router
  .group(() => {
    router.get('/', [InventoryController, 'index']).as('inventory').use(middleware.auth())
  })
  .prefix('/inventario')
