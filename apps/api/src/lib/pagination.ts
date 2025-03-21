import { z } from "zod";

export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(schema: T) => {
  const paginationMetaSchema = z.object({
    count: z.number().int(),
    total: z.number().int(),
    page: z.number().int(),
    pageSize: z.number().int(),
    prevPage: z.number().int().optional(),
    nextPage: z.number().int().optional(),
    lastPage: z.number().int(),
  });

  return z.object({
    data: schema.array(),
    meta: paginationMetaSchema,
  });
};
