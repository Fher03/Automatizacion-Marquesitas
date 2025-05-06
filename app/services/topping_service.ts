import Topping from '#models/topping'

export class ToppingService {
  public static async getAllString() {
    const toppings = await Topping.all()
    const eachTopping = toppings.map((topping) => topping.serialize())
    const toppingsList = eachTopping.map((topping) => topping.name)
    return JSON.stringify(toppingsList)
  }
}
