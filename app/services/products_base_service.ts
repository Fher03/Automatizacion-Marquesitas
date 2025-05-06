import ProductBase from '#models/product_base'

export class ProductsBaseService {
  public static async getAll() {
    const products = await ProductBase.all()
    const productsList = products.map((product) => product.serialize())
    return productsList
  }
}
