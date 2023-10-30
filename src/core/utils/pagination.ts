export function getNextPage(currentPage: number, totalPages: number) {
  if (currentPage < totalPages) {
    return currentPage + 1;
  }
  return currentPage;
}

export function getPreviousPage(currentPage: number) {
  if (currentPage > 1) {
    return currentPage - 1;
  }
  return currentPage;
}
