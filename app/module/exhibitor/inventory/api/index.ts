// Query hooks
export { useInventory } from './get-products';

export { useProductById } from './get-product-by-id';

// Mutation hooks
export {
  useCreateProduct,
  type CreateProductPayload,
  type CreateProductResponse
} from './create-product';

export {
  useUpdateProduct,
  type UpdateProductPayload,
  type UpdateProductResponse
} from './update-product';

export {
  useDeleteProduct,
  type DeleteProductPayload,
  type DeleteProductResponse
} from './delete-product';

export {
  useImportProductsCsv,
  type ImportProductsCsvPayload,
  type ImportProductsCsvResponse
} from './import-products-csv';
