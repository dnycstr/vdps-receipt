import { Menu } from '@headlessui/react';
import { ListBulletIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { CardMenu } from './CardMenu';

export interface CardListViewModel {
  id: number;
  name: string;
  description?: string;
  image: ReactNode;
}

interface Props {
  data: CardListViewModel[];
  detailsRoute: string;
  editRoute: string;
  onDelete?: (id: number) => void;
}

export const CardList: React.FC<Props> = ({
  data,
  detailsRoute,
  editRoute,
  onDelete,
}) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {data.map((row, index) => (
        <li
          key={index}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-4">
            <div className="ml-auto text-right">
              <CardMenu
                detailsMenuItem={
                  <Menu.Item>
                    <Link
                      to={`${detailsRoute}/${row.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <span className="ml-3">View Details</span>
                    </Link>
                  </Menu.Item>
                }
                editMenuItem={
                  <Menu.Item>
                    <Link
                      to={`${editRoute}/${row.id}/edit`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <span className="ml-3">Edit</span>
                    </Link>
                  </Menu.Item>
                }
                deleteMenuItem={
                  onDelete ? (
                    <Menu.Item>
                      <div
                        className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => onDelete(row.id)}
                      >
                        <span className="ml-3">Delete</span>
                      </div>
                    </Menu.Item>
                  ) : undefined
                }
              />
            </div>

            <div className="p-4">
              {row.image}

              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {row.name}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{row.description}</dd>
              </dl>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <Link
                  to={`${detailsRoute}/${row.id}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <ListBulletIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">View Details</span>
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  to={`${editRoute}/${row.id}/edit`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <PencilSquareIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Edit</span>
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
