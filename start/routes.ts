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
const LogoutController = () => import('#controllers/auth/logout_controller')

router.on('/').render('pages/home').use(middleware.auth())

router.get('/login', [SessionController, 'index'])
router.post('/login', [SessionController, 'store']).as('login')
router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())
