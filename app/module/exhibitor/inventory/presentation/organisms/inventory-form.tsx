'use client';

import {
  Button,
  DatePicker,
  ErrorText,
  FileUploader,
  HelperText,
  Input,
  Separator,
  Textarea
} from '@/app/core/shared/components/atoms';
import {
  CurrencySelector,
  IconButton,
  LoadingButton,
  MultiSelect
} from '@/app/core/shared/components/molecules';
import { ProductCategorySelect } from '@/app/core/shared/components/organisms';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { useFileUploader } from '@/app/core/shared/hooks/use-file-uploader';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO } from 'date-fns';
import { useRouter } from 'nextjs-toploader/app';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Inventory, useInventory } from '../../hooks';
import { inventoryService } from '../../services';
import { PlusIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';

interface InventoryForm {
  isReadOnly?: boolean;
  inventory?: Inventory;
}

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().required('Description is required'),
  basePrice: yup
    .number()
    .required('Price is required')
    .min(1, 'Price must be at least 1')
    .typeError('Invalid price')
    .test(
      'no-leading-price-zeros',
      'Leading zero is not allowed',
      (_value, context) => {
        const value = context.originalValue?.toString() ?? '';
        const hasInvalidLeadingZero = value !== '0' && value.startsWith('0');
        return !hasInvalidLeadingZero;
      }
    ),
  images: yup.array<File>().min(1, 'Images are required'),

  quantity: yup
    .number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1')
    .typeError('Invalid quantity')
    .test(
      'no-leading-price-zeros',
      'Leading zero is not allowed',
      (_value, context) => {
        const value = context.originalValue?.toString() ?? '';
        const hasInvalidLeadingZero = value !== '0' && value.startsWith('0');
        return !hasInvalidLeadingZero;
      }
    ),
  currency: yup.string().required('Currency is required'),
  tags: yup.array(),
  customAttrs: yup.array().of(
    yup
      .object()
      .shape({
        key: yup.string().trim(),
        value: yup.string().trim()
      })
      .test(
        'both-or-neither',
        'Both key and value are required when one is provided',
        function (value, ctx) {
          const { key, value: val } = value || {};
          const hasKey = key && key.trim().length > 0;
          const hasValue = val && val.trim().length > 0;

          // Both empty is valid
          if (!hasKey && !hasValue) return true;

          // Both filled is valid
          if (hasKey && hasValue) return true;

          // One filled, one empty is invalid
          if (hasKey && !hasValue) {
            return ctx.createError({
              type: 'value-error',
              message: 'Value is required when key is provided'
            });
          }

          if (hasValue && !hasKey) {
            return ctx.createError({
              type: 'key-error',
              message: 'Key is required when value is provided'
            });
          }

          return true;
        }
      )
  ),
  productCategoryId: yup.mixed<{
    id: string;
    name: string;
  }>(),
  sku: yup.string().required('SKU is required'),
  availableFrom: yup
    .date()
    .required('Available from is required')
    .typeError('Must be a valid date'),
  availableTo: yup
    .date()
    .required('Available to is required')
    .typeError('Must be a valid date')
    .test(
      'available-to-greater-than-available-from',
      'Available to must be greater than available from',
      function (availableTo, ctx) {
        const availableFrom = ctx.parent.availableFrom;
        return !availableFrom || availableTo > availableFrom;
      }
    )
});

type InventoryFormValues = yup.InferType<typeof validationSchema>;

export const InventoryForm = ({ isReadOnly, inventory }: InventoryForm) => {
  const { refetchInventory } = useInventory({});
  const router = useRouter();
  const mutation = useCustomMutation();

  const form = useForm<InventoryFormValues>({
    defaultValues: {
      name: inventory?.name ?? '',
      description: inventory?.description ?? '',
      basePrice: inventory?.basePrice ?? 0,
      quantity: inventory?.quantity ?? 0,
      currency: inventory?.currency ?? 'NGN',
      tags: inventory?.tags
        ? inventory.tags.map((tag) => ({ label: tag, value: tag }))
        : [],
      images: [],
      customAttrs: inventory?.customAttrs ?? [
        {
          key: '',
          value: ''
        }
      ],
      productCategoryId: inventory?.productCategory
        ? {
            id: inventory.productCategory.id,
            name: inventory.productCategory.name
          }
        : undefined,
      sku: inventory?.sku ?? '',
      availableFrom: inventory?.availableFrom
        ? new Date(inventory.availableFrom)
        : undefined,
      availableTo: inventory?.availableTo
        ? new Date(inventory.availableTo)
        : undefined
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'customAttrs'
  });

  const {
    files,
    getInputProps,
    getRootProps,
    isDragActive,
    maxFiles,
    maxSize,
    onRemove
  } = useFileUploader({
    type: 'image',
    maxFiles: 5,
    maxSize: 15 * 1024 * 1024,
    onValueChange(value) {
      form.setValue('images', value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = form;

  const handleCreateProduct = (data: InventoryFormValues) => {
    const formValues = {
      ...data,
      customAttrs: (() => {
        const validAttrs = (data.customAttrs ?? []).filter(
          (attr): attr is { key: string; value: string } =>
            attr?.key !== undefined && attr?.value !== undefined
        );
        return validAttrs.length > 0 ? validAttrs : null;
      })(),
      images: data.images ?? [],
      tags: (data.tags ?? []).map((tag) => tag.value),
      productCategoryId: data.productCategoryId?.id ?? null,
      availableFrom: formatISO(data.availableFrom!),
      availableTo: formatISO(data.availableTo!)
    };

    mutation.mutate(inventoryService.createInventory(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Product added successfully');
        refetchInventory();
        router.push(EXHIBITOR_APP_ROUTES.inventory.root());
      }
    });
  };

  const handleUpdateProduct = (data: InventoryFormValues) => {
    if (!inventory?.id) return;
    const formValues = {
      ...data,
      customAttrs: (() => {
        const validAttrs = (data.customAttrs ?? []).filter(
          (attr): attr is { key: string; value: string } =>
            attr?.key !== undefined && attr?.value !== undefined
        );
        return validAttrs.length > 0 ? validAttrs : null;
      })(),
      images: data.images ?? [],
      tags: (data.tags ?? []).map((tag) => tag.value),
      productCategoryId: data.productCategoryId?.id ?? null,
      availableFrom: formatISO(data.availableFrom!),
      availableTo: formatISO(data.availableTo!)
    };

    mutation.mutate(
      inventoryService.updateInventory(inventory.id, formValues),
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess() {
          toast.success('Product updated successfully');
          refetchInventory();
          router.push(EXHIBITOR_APP_ROUTES.inventory.root());
        }
      }
    );
  };

  const onSubmit = (data: InventoryFormValues) => {
    if (!inventory) {
      handleCreateProduct(data);
    } else {
      handleUpdateProduct(data);
    }
  };

  const handleAddNewCustomAttr = () => {
    append({ key: '', value: '' });
  };

  const watchedCurrency = watch('currency');
  const watchedTags = watch('tags');
  const watchedCustomAttrs = watch('customAttrs');
  const watchedAvailableFrom = watch('availableFrom');
  const watchedAvailableTo = watch('availableTo');

  const {
    name: nameError,
    description: descriptionError,
    basePrice: basePriceError,
    currency: currencyError,
    tags: tagsError,
    quantity: quantityError,
    customAttrs: customAttrsError,
    productCategoryId: productCategoryIdError,
    sku: skuError,
    availableFrom: availableFromError,
    images: imagesError,
    availableTo: availableToError
  } = errors;

  const uploadedImages = inventory?.images ?? [];
  const hasUploadedImages = uploadedImages.length > 0;

  const hasMoreThanOneCustomAttr =
    watchedCustomAttrs && watchedCustomAttrs?.length > 1;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset
        className="grid lg:grid-cols-[1fr_32.43rem] gap-x-[0.90rem] gap-y-5 w-full"
        disabled={mutation.isPending}
      >
        {/* Section 1 */}
        <div className="rounded-[8px] border border-input bg-background py-[2.19rem] px-6 flex flex-col gap-6">
          {/* Name */}
          <div className="w-full">
            <Input
              label="Name"
              placeholder="e.g Product name"
              readOnly={isReadOnly}
              hasError={!!nameError?.message?.length}
              {...register('name')}
              /**
               *
               * I am overriding onChange prop (which should come automatically from spreading register) because fields not interacting on autofill.
               */
              onChange={(e) => {
                form.setValue('name', e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }}
            />
            <ErrorText message={nameError?.message} />
          </div>

          {/* Quantity */}
          <div className="w-full">
            <Input
              label="Stock Quantity"
              placeholder="e.g Enter quantity"
              readOnly={isReadOnly}
              hasError={!!quantityError?.message?.length}
              {...register('quantity')}
            />
            <ErrorText message={quantityError?.message} />
          </div>

          {/* Currency & Price*/}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Currency */}
            <div>
              <CurrencySelector
                name="currency"
                value={watchedCurrency}
                isDisabled={isReadOnly}
                onChange={(value) => {
                  if (value) {
                    form.setValue('currency', value, {
                      shouldValidate: true
                    });
                  }
                }}
                hasError={!!currencyError?.message?.length}
                label="Currency"
              />

              <ErrorText message={currencyError?.message} />
            </div>
            {/* Price */}
            <div>
              <Input
                label="Price"
                placeholder="e.g Enter price"
                hasError={!!basePriceError?.message?.length}
                readOnly={isReadOnly}
                {...register('basePrice')}
              />
              <ErrorText message={basePriceError?.message} />
            </div>
          </div>

          {/* Tags & Category */}
          <div className="grid xl:grid-cols-2 gap-6">
            {/* Tags */}
            <div>
              <MultiSelect
                label="Tags (Optional)"
                placeholder="e.g Shirts, T-Shirts, Pants"
                options={[]}
                isCreatable
                optionLabelProp="label"
                isDisabled={isReadOnly}
                optionValueProp="value"
                defaultValue={watchedTags}
                onSelectChange={(value) => {
                  form.setValue('tags', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  });
                }}
                name="tags"
                controlClassName="w-full"
                hasError={!!tagsError?.message?.length}
              />
              <HelperText text="You can create new tag by typing and pressing enter" />
            </div>
            {/* Category */}
            <div>
              <ProductCategorySelect
                form={form}
                name="productCategoryId"
                label="Category (Optional)"
                categoryError={productCategoryIdError?.message}
                isDisabled={isReadOnly}
                onSelectChange={(value) => {
                  form.setValue('productCategoryId', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  });
                }}
              />
              <ErrorText message={productCategoryIdError?.message} />
            </div>
          </div>

          {/* SKU */}
          <div className="w-full">
            <Input
              label="SKU"
              placeholder="e.g Enter SKU"
              hasError={!!skuError?.message?.length}
              readOnly={isReadOnly}
              {...register('sku')}
            />
            <ErrorText message={skuError?.message} />
          </div>

          {/* Description */}
          <div className="w-full">
            <Textarea
              label="Description"
              placeholder="Enter product description"
              readOnly={isReadOnly}
              rows={8}
              {...register('description')}
            />
            <ErrorText message={descriptionError?.message} />
          </div>

          {/* Custom Attributes */}
          <div className="flex flex-col gap-x-[1.86rem] gap-y-2 w-full text-left">
            <p
              className={
                isReadOnly && !hasMoreThanOneCustomAttr
                  ? 'hidden'
                  : 'text-foreground font-bold'
              }
            >
              Custom Attributes(Optional)
            </p>
            <div className="grid gap-x-4 gap-y-[1.86rem]">
              {fields.map((field, index) => {
                const itemError = customAttrsError?.[index];

                const keyErrorError =
                  itemError?.type === 'key-error'
                    ? itemError?.message
                    : undefined;
                const valueErrorError =
                  itemError?.type === 'value-error'
                    ? itemError?.message
                    : undefined;

                return (
                  <div
                    key={field.id}
                    className="rounded-[8px] border border-input bg-background pb-[2.19rem]"
                  >
                    <div className="px-6 mt-4.5 flex flex-col gap-6">
                      <div className="flex justify-between">
                        <div className="w-8 h-8 rounded-full bg-highlight flex items-center justify-center mb-3">
                          <p>{index + 1}</p>
                        </div>
                        {/* Remove Button */}
                        {hasMoreThanOneCustomAttr && !isReadOnly && (
                          <div className="flex">
                            <Button
                              type="button"
                              variant="destructive"
                              aria-label="Remove item"
                              className="w-8 h-8"
                              onClick={() => remove(index)}
                            >
                              <TrashIcon className="size-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-x-7 gap-y-[1.86rem]">
                        <div className="w-full flex flex-col">
                          {/* Key */}
                          <Input
                            type="text"
                            label="Key"
                            placeholder="e.g. Color"
                            hasError={!!keyErrorError?.length}
                            readOnly={isReadOnly}
                            {...register(`customAttrs.${index}.key`)}
                          />
                          <ErrorText message={keyErrorError} />
                        </div>

                        {/* Value */}
                        <div className="w-full flex flex-col">
                          <Input
                            type="text"
                            label="Value"
                            placeholder="e.g. Red"
                            readOnly={isReadOnly}
                            hasError={!!valueErrorError?.length}
                            {...register(`customAttrs.${index}.value`)}
                          />
                          <ErrorText message={valueErrorError} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Add Button */}
            {!isReadOnly && (
              <div className="flex">
                <IconButton
                  onClick={handleAddNewCustomAttr}
                  variant="highlight"
                  type="button"
                  className="text-foreground"
                >
                  <PlusIcon />
                  <span>Add new attribute</span>
                </IconButton>
              </div>
            )}
          </div>
        </div>

        {/* Section 2 */}
        <div className="rounded-[8px] border border-input bg-background pb-[2.19rem] self-start">
          <div className="bg-foreground/4 px-5 py-4.5">
            <h3 className="text-foreground font-bold">
              Additional Information
            </h3>
            <p className="text-xs font-normal mt-2.5">
              Additional information about the product
            </p>
          </div>
          <div className="px-6 mt-4.5 flex flex-col gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-4 text-base">
                Availability Date
              </h4>
              {/* From & To */}
              <div className="grid  gap-6">
                {/* From */}
                <div className="w-full">
                  <DatePicker
                    value={watchedAvailableFrom}
                    name="availableFrom"
                    label="From"
                    className="rounded-[4px]"
                    placeholderText="mm/dd/yyyy"
                    showTimeSelect={true}
                    max={watchedAvailableTo}
                    isDisabled={isReadOnly}
                    handleChange={({ value }) => {
                      form.setValue('availableFrom', value as Date, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true
                      });
                    }}
                  />
                  <ErrorText message={availableFromError?.message} />
                </div>

                {/* To */}
                <div className="w-full">
                  <DatePicker
                    value={watchedAvailableTo}
                    name="availableTo"
                    label="To"
                    showTimeSelect={true}
                    placeholderText="mm/dd/yyyy"
                    className="rounded-[4px]"
                    min={watchedAvailableFrom}
                    isDisabled={isReadOnly}
                    handleChange={({ value }) => {
                      form.setValue('availableTo', value as Date, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true
                      });
                    }}
                  />
                  <ErrorText message={availableToError?.message} />
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="flex flex-col gap-[0.5rem] w-full">
              <p className="text-[0.75rem] font-medium">Product Images</p>
              {isReadOnly && !hasUploadedImages && (
                <p className="text-sm h-14 w-full flex items-center justify-center">
                  No images uploaded
                </p>
              )}
              {!isReadOnly && (
                <FileUploader
                  maxFiles={maxFiles}
                  showPreview={true}
                  placeholder="SVG, PNG, JPEG, JPG"
                  isDisabled={isReadOnly}
                  type="image"
                  getInputProps={getInputProps}
                  getRootProps={getRootProps}
                  files={files}
                  isDragActive={isDragActive}
                  removeFile={(key) => onRemove(key)}
                  maxSize={maxSize}
                />
              )}
              {hasUploadedImages && (
                <>
                  {!isReadOnly && (
                    <div className="flex flex-col gap-4 mt-4">
                      <Separator />
                      <p className="text-sm font-medium">Uploaded images</p>
                      <Separator />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {uploadedImages.map((image) => (
                      <div
                        key={image}
                        className="relative flex justify-center items-center border border-input rounded-[8px] py-2 px-1 w-20 h-20"
                      >
                        <div className="flex flex-1 items-center gap-2 relative">
                          <Image
                            src={image}
                            alt="Product image"
                            width={80}
                            height={80}
                            loading="lazy"
                            className="aspect-square shrink-0 rounded-[4px] object-cover"
                          />
                        </div>

                        {!isReadOnly && (
                          <button
                            type="button"
                            className="absolute -top-4  bg-tertiary rounded-full text-background w-6 h-6 flex items-center justify-center cursor-pointer self-center"
                            aria-label="Remove file"
                            // onClick={onRemove}
                          >
                            <TrashIcon size={14} aria-hidden="true" />
                            <span className="sr-only">Remove file</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
              <ErrorText message={imagesError?.message} />
            </div>
          </div>
        </div>
      </fieldset>
      {isReadOnly ? (
        <></>
      ) : (
        <div className="flex justify-end lg:mt-[3.38rem] mt-[3.38rem]">
          <LoadingButton
            type="submit"
            variant="tertiary"
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            className="h-8"
          >
            {inventory ? 'Update Product' : 'Add Product'}
          </LoadingButton>
        </div>
      )}
    </form>
  );
};
