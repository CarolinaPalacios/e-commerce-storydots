import { initContract } from '@ts-rest/core';
import { z } from 'zod';

export type User = {
  email: string;
  name: string | null;
  img: string | null;
};

export type Brand = {
  id?: string;
  name?: string;
  logo_url?: string;
  products: Product[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand: Brand;
  brand_id: string;
};

const c = initContract();

export const authContract = c.router(
  {
    login: {
      method: 'POST',
      path: '/login',
      body: c.type<null>(),
      headers: z.object({
        authorization: z.string().startsWith('Bearer '),
      }),
      strictStatusCodes: true,
      responses: {
        200: c.type<User>(),
        400: c.type<{ message: string }>(),
        401: c.type<{ message: string }>(),
        404: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
    },
    me: {
      method: 'GET',
      path: '/me',
      strictStatusCodes: true,
      responses: {
        200: c.type<User>(),
        403: c.type<{ message: string }>(),
        404: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
    },
    logout: {
      method: 'POST',
      path: '/logout',
      body: c.type<null>(),
      strictStatusCodes: true,
      responses: {
        200: c.type<null>(),
        400: c.type<{ message: string }>(),
        401: c.type<{ message: string }>(),
        404: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
    },
  },
  {
    pathPrefix: '/auth',
  },
);

export const productContract = c.router(
  {
    getAllProducts: {
      method: 'GET',
      path: '',
      query: z.object({
        page: z.coerce.number().optional(),
        pageSize: z.coerce.number().optional(),
      }),
      strictStatusCodes: true,
      responses: {
        200: c.type<{ products: Product[]; count: number; pages: number }>(),
        500: c.type<{ message: string }>(),
      },
    },
    getProduct: {
      method: 'GET',
      path: '/:id',
      strictStatusCodes: true,
      pathParams: z.object({ id: z.string() }),
      responses: {
        200: c.type<Product>(),
        404: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
    },
    createProduct: {
      method: 'POST',
      path: '',
      body: c.type<Omit<Product, 'id'>>(),
      strictStatusCodes: true,
      responses: {
        201: c.type<Product>(),
        400: c.type<{ message: string }>(),
        409: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
    },
    updateProduct: {
      method: 'PATCH',
      path: '/:id',
      body: c.type<Partial<Product>>(),
      pathParams: z.object({ id: z.string() }),
      strictStatusCodes: true,
      responses: {
        200: c.type<Product>(),
        400: c.type<{ message: string }>(),
        404: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
    },
    deleteProduct: {
      method: 'DELETE',
      path: '/:id',
      pathParams: z.object({ id: z.string() }),
      body: c.type<null>(),
      strictStatusCodes: true,
      responses: {
        204: c.type<null>(),
        404: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
    },
  },
  {
    pathPrefix: '/products',
  },
);

export const brandContract = c.router(
  {
    getAllBrands: {
      method: 'GET',
      path: '',
      strictStatusCodes: true,
      responses: {
        200: c.type<{ brands: Brand[] }>(),
        500: c.type<{ message: string }>(),
      },
    },
    getProductsByBrand: {
      method: 'GET',
      path: '/:id/products',
      pathParams: z.object({ id: z.string() }),
      strictStatusCodes: true,
      responses: {
        200: c.type<{ products: Product[] }>(),
        404: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
    },
  },
  {
    pathPrefix: '/brands',
  },
);
