import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1

  private products: Product[] = [{
    id: 1,
    name: "Producto 1",
    description: "Es un Producto 1",
    price: 12,
    stock: 12
  }]


  findAll() {
    return this.products
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id)
    if (!product) {
      throw new NotFoundException(`Producto con #${id} no se encontro`)
    }
    return product
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1
    const newProduct = {
      id: this.counterId,
      ...payload
    }
    this.products.push(newProduct)
    return newProduct
  }

}
