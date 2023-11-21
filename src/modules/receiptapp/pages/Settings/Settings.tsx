import { Outlet } from 'react-router-dom';

import { PageContent, PageHeading } from '@components/Page';

export const Settings: React.FC = () => {
  return (
    <>
      <PageHeading>Settings</PageHeading>

      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
};
