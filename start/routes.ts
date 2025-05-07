const SessionController = () => import('#controllers/sessions_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductsBaseController = () => import('#controllers/products_base_controller')
const OrdersController = () => import('#controllers/orders_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router.get('/', [OrdersController, 'index']).as('dashboard').use(middleware.auth())

router.get('/login', [SessionController, 'index'])
router.post('/login', [SessionController, 'store']).as('login')
router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())

router
  .group(() => {
    router.get('/', [OrdersController, 'indexPending']).as('orders').use(middleware.auth())
    router.get('/crear', [OrdersController, 'create']).as('orders.create').use(middleware.auth())
    router.post('/guardar', [OrdersController, 'store']).use(middleware.auth()).as('orders.store')
    router.post('/borrar/:id', [OrdersController, 'destroy']).as('orders.delete')
  })
  .prefix('/pedidos')

router
  .group(() => {
    router.get('/', [ProductsBaseController, 'index']).as('inventory').use(middleware.auth())
  })
  .prefix('/inventario')
