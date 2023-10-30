interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPrevious?: () => void;
  onNext?: () => void;
}
export const Pagination: React.FC<Props> = ({
  page,
  pageSize,
  total,
  onPrevious,
  onNext,
}) => {
  const startRecord = page * pageSize - pageSize + 1;
  const tempEndRecord = page * pageSize;
  const endRecord = tempEndRecord > total ? total : tempEndRecord;

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startRecord}</span> to{' '}
          <span className="font-medium">{endRecord}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => (onPrevious ? onPrevious() : undefined)}
          disabled={onPrevious ? false : true}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => (onNext ? onNext() : undefined)}
          disabled={onNext ? false : true}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
};
