import { Query } from 'mongoose';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export async function paginate<T>(
  query: Query<T[], T>,
  page: number = 1,
  limit: number = 10,
): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    query.skip(skip).limit(limit).exec(),
    query.model.countDocuments(query.getFilter()).exec(),
  ]);

  return {
    data,
    total,
    page,
    limit,
  };
}
