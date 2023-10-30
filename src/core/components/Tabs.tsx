import { useState } from 'react';

import { classNames } from '@utils/classNames';

interface TabsProps {
  index: number;
  title: string;
}

interface Props {
  defaultTabIndex: number;
  tabs: TabsProps[];
  onTabChange: (tabIndex: number) => void;
}

export const Tabs: React.FC<Props> = ({
  defaultTabIndex,
  tabs,
  onTabChange,
}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(defaultTabIndex);

  return (
    <div>
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs[currentTabIndex].title}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const index = Number(event.target.value);

            setCurrentTabIndex(index);
            onTabChange(index);
          }}
        >
          {tabs.map((tab, index) => (
            <option key={index} value={index}>
              {tab.title}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <span
                key={tab.title}
                className={classNames(
                  tab.index == currentTabIndex
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                )}
                onClick={() => {
                  setCurrentTabIndex(index);
                  onTabChange(index);
                }}
              >
                <span>{tab.title}</span>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
