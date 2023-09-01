import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Product, ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

import { apiWithClientCredentialsFlow } from './BuildClient';

export async function getCategories(): Promise<Category[]> {
  const visitor = apiWithClientCredentialsFlow()
  const response = await visitor.categories().get().execute()
  return response.body.results;
}

export async function getProducts(): Promise<Product[]> {
  const visitor = apiWithClientCredentialsFlow()
  const response = await visitor.products().get().execute()
  return response.body.results;
}


export async function getProductsByCategory(id: string): Promise<ProductProjection[]> {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor.productProjections().search().get(
    {
      queryArgs: {
        filter: `categories.id:subtree("${id}")`
      }
    }
  ).execute()

  return response.body.results

}

export async function getProductByKey(key: string): Promise<Product> {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor
    .products()
    .withKey({ key: `${key}` })
    .get()
    .execute()

  return response.body
}

export async function getProductByFilter(filters: object[], categoryID: string): Promise<ProductProjection[]> {
  const visitor = apiWithClientCredentialsFlow();

  const filterPropertiescategoryID = `categories.id:subtree("${categoryID}")`;
  const filterProperties = [];

  const filtersCounter = Object.values(filters[0]).length;

  for (let i = 0; i < filtersCounter; i+= 1) {
    const filter = `variants.attributes.${Object.keys(filters[i])}.key:${Object.values(filters[i]).map(item => item.map((item1: string) => `"${item1}"`)).join(",")}`;
    filterProperties.push(filter);
  }

  filterProperties.push(filterPropertiescategoryID);

  const response = await visitor
    .productProjections()
    .search()
    .get(
      {
        queryArgs: {
          filter: filterProperties,
        }
      }
    )
    .execute()
  return response.body.results
}
