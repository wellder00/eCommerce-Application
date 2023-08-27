import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { makeAutoObservable, runInAction } from 'mobx';

import { SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import { getCategories, getProducts, getProductsByCategory } from '../services/productService';

type ProductType = {
  slug: string;
  productName: string;
  description: string;
  price: string;
  priceDiscount?: string;
  currency: string;
  images: Image[];
  isDiscount: boolean;
};

type ProductStoreType = {
  isAppLoading: boolean;
  isProductsLoading: boolean;
  products: ProductType[];
  currentProduct: ProductType | null;
  categories: Category[];
  error: null | string;
  fetchProducts: () => Promise<void>;
  fetchProduct?: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  sortState: SortOption;
  setSortState: (value: SortOption) => void;
  categoryIdByName: (name: string) => string | undefined;
  fetchProductsByCategory: (id: string | undefined) => Promise<void>;
};

const createProductStore = (): ProductStoreType => {
  const store = {
    isAppLoading: false,
    isProductsLoading: false,
    products: [] as ProductType[],
    categories: [] as Category[],
    currentProduct: null,
    error: null as null | string,
    sortState: SortOption.Default,

    setSortState(value: SortOption): void {
      store.sortState = value
    },

    async fetchCategories(): Promise<void> {
      store.isAppLoading = true;
      try {
        const fetchedCategories = await getCategories();
        const mainCategories = fetchedCategories
          .filter((item) => !item.parent)
          .sort((a, b) => parseFloat(a.orderHint) - parseFloat(b.orderHint));

        runInAction(() => {
          store.categories = mainCategories;
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching categories';
        });
      } finally {
        store.isAppLoading = false;
      }
    },

    categoryIdByName(name: string): string | undefined {
      const category = store.categories.find((cat) => cat.name.en.toLocaleLowerCase() === name);
      return category ? category.id : undefined;
    },

    async fetchProducts(): Promise<void> {
      try {
        const fetchedProducts = await getProducts();
        const productsList: ProductType[] = fetchedProducts.reduce((acc, item) => {
          const obj = {} as ProductType;
          const data = item.masterData.current;
          obj.slug = `${data.masterVariant.sku}`;
          obj.productName = `${data.name?.en}`;
          obj.description = `${data.description?.en}`;
          if (data.masterVariant.prices?.length) {
            obj.price = `${data.masterVariant.prices[0]?.value?.centAmount}`;
            obj.currency = data.masterVariant.prices[0]?.value.currencyCode;
            obj.isDiscount = Boolean(data.masterVariant.prices[0]?.discounted);
            if (obj.isDiscount) obj.priceDiscount = `${data.masterVariant.prices[0]?.discounted?.value.centAmount}`;
          }
          if (data.masterVariant.images !== undefined) obj.images = [...data.masterVariant.images];
          acc.push(obj);
          return acc;
        }, [] as ProductType[]);
        runInAction(() => {
          store.products = [...productsList];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      }
    },

    async fetchProductsByCategory(id: string | undefined): Promise<void> {
      store.isProductsLoading = true;
      try {
        if (id === undefined) return;
        const fetchedProductsByCategory = await getProductsByCategory(id);
        const productsList: ProductType[] = fetchedProductsByCategory.reduce((acc, item) => {
          const obj = {} as ProductType;
          obj.slug = `${item.slug.en}`;
          obj.productName = `${item.name?.en}`;
          obj.description = `${item.description?.en}`;
          if (item.masterVariant.prices?.length) {
            obj.price = `${item.masterVariant.prices[0]?.value?.centAmount}`;
            obj.currency = item.masterVariant.prices[0]?.value.currencyCode;
            obj.isDiscount = Boolean(item.masterVariant.prices[0]?.discounted);
            if (obj.isDiscount) obj.priceDiscount = `${item.masterVariant.prices[0]?.discounted?.value.centAmount}`;
          }
          if (item.masterVariant.images !== undefined) obj.images = [...item.masterVariant.images];
          acc.push(obj);
          return acc;
        }, [] as ProductType[]);
        runInAction(() => {
          store.products = [...productsList];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        store.isProductsLoading = false;
      }
    },
  };

  
  makeAutoObservable(store);

  return store;
};

export const productStore = createProductStore();
