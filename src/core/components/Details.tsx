import { Menu } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { CardMenu } from './CardMenu';

interface DetailsData {
  label?: string;
  text?: string;
  linkTo?: string;
}

interface Props {
  id: number;
  data: DetailsData[];
  title?: string;
  subtitle?: string;
  editRoute?: string;
  returnRoute?: string;
  onDelete?: (id: number) => void;
}

export const Details: React.FC<Props> = ({
  id,
  data,
  title,
  subtitle,
  editRoute,
  returnRoute,
  onDelete,
}) => {
  return (
    <>
      <div className="mx-auto w-full md:w-3xl">
        <div className="space-y-6 divide-y divide-gray-200  bg-white sm:rounded-lg sm:shadow">
          <div className="flex flex-row justify-between px-4 pt-5 sm:px-6">
            <div className="self-start">
              {title && (
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
              )}

              {subtitle && (
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
            {(!!editRoute || !!returnRoute || onDelete) && (
              <div className="self-end">
                <CardMenu
                  editMenuItem={
                    !!editRoute ? (
                      <Menu.Item>
                        <Link
                          to={`${editRoute}/${id}/edit`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <span className="ml-3">Edit</span>
                        </Link>
                      </Menu.Item>
                    ) : undefined
                  }
                  deleteMenuItem={
                    onDelete ? (
                      <Menu.Item>
                        <div
                          className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => onDelete(id)}
                        >
                          <span className="ml-3">Delete</span>
                        </div>
                      </Menu.Item>
                    ) : undefined
                  }
                  returnMenuItem={
                    !!returnRoute ? (
                      <Menu.Item>
                        <Link
                          to={`${returnRoute}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <span className="ml-3">Return</span>
                        </Link>
                      </Menu.Item>
                    ) : undefined
                  }
                />
              </div>
            )}
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="sm:divide-y sm:divide-gray-200">
              {data.map((row, index) => (
                <div
                  key={index}
                  className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
                >
                  <dt className="text-sm font-medium text-gray-500 pl-4 sm:pl-6">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 pl-4 sm:pl-0 sm:mt-0 pr-4 sm:pr-6">
                    {row.text}{' '}
                    {row.linkTo && (
                      <Link
                        to={row.linkTo}
                        className="inline-flex items-center ml-6 shadow-sm text-cyan-500"
                      >
                        <ArrowTopRightOnSquareIcon
                          className="h-3 w-3"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};
