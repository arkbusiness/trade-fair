// Query hooks
export {
  useProductCategories,
  productCategoriesQueryKeys,
  type IProductCategory
} from './get-product-categories';

// Mutation hooks
export {
  useDeleteProductCategory,
  type DeleteProductCategoryPayload,
  type DeleteProductCategoryResponse
} from './delete-product-category';

export {
  useUpdateProductCategory,
  type UpdateProductCategoryPayload,
  type UpdateProductCategoryResponse
} from './update-product-category';
