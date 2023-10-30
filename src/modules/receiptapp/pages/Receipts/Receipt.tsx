import { Outlet } from 'react-router-dom';

import { PageContent, PageHeading } from '@components/Page';

export const Receipt: React.FC = () => {
  return (
    <>
      <PageHeading>Receipts</PageHeading>

      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
};
