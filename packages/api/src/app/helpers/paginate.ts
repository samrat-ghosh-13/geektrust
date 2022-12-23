export const paginate = (
  array: Array<any>,
  pageSize: number,
  pageNumber: number
) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
