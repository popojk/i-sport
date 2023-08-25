export function paginate (page: number, pageSize: number) {
  const offset = page * pageSize;
  const limit = pageSize;
  return {
    limit,
    offset
  };
}
