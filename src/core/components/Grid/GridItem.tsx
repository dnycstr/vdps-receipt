import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import { GridActionLinks } from './GridActionLinks';
import { GridLink } from './GridLink';

interface Props {
  id: number;
  title: string;
  description: string;
  tags: string[];
  detailsRoute: string;
  editRoute: string;
  viewRoute?: string;
  onClick: (paramId: number) => void;
}

export const GridItem: React.FC<Props> = ({
  id,
  title,
  description,
  tags,
  detailsRoute,
  editRoute,
  onClick,
}) => {
  return (
    <>
      <div className="rounded-xl border bg-white  border-gray-200 shadow-md ">
        <li className="overflow-hidden h-72">
          <div className="flex items-center gap-x-4 border-b-2 border-gray-900/5 p-6">
            <div className=" py-4 text-lg font-semibold leading-6 text-gray-900">
              {title}
            </div>

            <Menu as="div" className="relative ml-auto">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon
                  className="h-6 w-6 rounded-full bg-gray-100 p-1"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <GridActionLinks id={id} onClick={onClick}>
                  Delete
                </GridActionLinks>

                <GridLink to={`${detailsRoute}`}>Details</GridLink>

                <GridLink to={`${editRoute}`}>Edit</GridLink>
              </Menu.Items>
            </Menu>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 ">
            <div className="flex justify-between gap-x-4 py-3">
              <dd className="text-gray-700">
                <div className="text-md leading-6 text-gray-900 py-4">
                  {description}
                </div>
              </dd>
            </div>
          </dl>
        </li>
        <div className="flex justify-evenly py-2 border-t">
          <div>
            {tags
              .filter((o) => o.length > 0)
              .map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-blue-700"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
