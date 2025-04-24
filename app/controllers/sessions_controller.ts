import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionController {
  index({ view }: HttpContext) {
    return view.render('pages/login')
  }
  async store({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    try {
      const user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)
    } catch (error) {
      console.log(error)
    }
    response.redirect('/')
  }
}
