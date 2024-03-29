import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

interface Props {
  menuItems?: React.ReactNode[];
  detailsMenuItem?: React.ReactNode;
  editMenuItem?: React.ReactNode;
  deleteMenuItem?: React.ReactNode;
  returnMenuItem?: React.ReactNode;
}

export const CardMenu: React.FC<Props> = ({
  menuItems,
  detailsMenuItem,
  editMenuItem,
  deleteMenuItem,
  returnMenuItem,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuItems && menuItems.map((menuItem) => menuItem)}
            {detailsMenuItem}
            {editMenuItem}
            {deleteMenuItem}
            {returnMenuItem}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
