import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';

import { PrimaryButton, PrimaryLinkButton } from '@components/Buttons';

interface Props {
  searchEnabled?: boolean;
  createRoute?: string;
  setSearchString?: (search: string) => void;
  loadData?: () => void;
}

export const TableSearchHead: React.FC<Props> = ({
  searchEnabled = true,
  createRoute,
  setSearchString,
  loadData,
}) => {
  return (
    <div className="relative z-8 flex h-16 flex-shrink-0 border-b border-gray-300 bg-white">
      <div className="flex flex-1 justify-between px-4 sm:px-6">
        <div className="flex flex-1">
          <div className="flex w-full md:ml-0">
            {searchEnabled && (
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <input
                  name="search-field"
                  id="search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0"
                  placeholder="Search"
                  type="search"
                  onChange={(e) =>
                    setSearchString && setSearchString(e.target.value)
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
          {loadData && (
            <PrimaryButton onClick={() => loadData()}>
              <ArrowPathIcon className="h-6 w-6" aria-hidden="true" />
              <span className="hidden md:block">Refresh</span>
            </PrimaryButton>
          )}
          {createRoute && (
            <PrimaryLinkButton to={`${createRoute}`}>
              <PlusIcon className="h-6 w-6" aria-hidden="true" />
              <span className="hidden md:block">Create</span>
            </PrimaryLinkButton>
          )}
        </div>
      </div>
    </div>
  );
};
