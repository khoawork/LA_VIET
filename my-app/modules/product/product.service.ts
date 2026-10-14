import { productRepository, ProductRepository } from "./product.repository";
import { CreateProductType } from "./product.type";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async createProduct(data: CreateProductType) {
        return await this.productRepository.createProduct(data);
    }   

    async getProductById(id: number) {
        return await this.productRepository.getProductById(id);
    }

    async getAllProducts(categoryId?: number) {
        return await this.productRepository.getAllProducts(categoryId);
    }

    async updateProduct(id: number, data: CreateProductType) {
        return await this.productRepository.updateProduct(id, data);
    }

    async deleteProduct(id: number) {
        return await this.productRepository.deleteProduct(id);
    }
}

export const productService = new ProductService(productRepository);