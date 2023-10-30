export function getDataUrl(
  baseUrl: string,
  endpoint: string,
  page?: number,
  pageSize?: number,
  search?: string
) {
  let url = `${baseUrl}${endpoint}?`;

  if (page) {
    url = url.concat(`page=${page}&`);
  }

  if (pageSize) {
    url = url.concat(`pagesize=${pageSize}&`);
  }

  if (search) {
    url = url.concat(`search=${search}&`);
  }

  const dataUrl = url.substring(0, url.length - 1);

  return dataUrl;
}
