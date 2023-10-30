import { TicketIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { PageContent, PageHeading } from '@components/Page';

const AppBox = tw.div`bg-white shadow-lg rounded-lg px-4 py-4 m-4 cursor-pointer hover:bg-gray-100`;

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <>
        <PageHeading>Home Page</PageHeading>

        <PageContent>
          <div className="flex justify-center">
            <AppBox
              onClick={() => {
                navigate('/receipts');
              }}
              title="Go to Receipts App"
            >
              <TicketIcon className="text-green-700 mr-4 flex-shrink-0 h-20 w-20" />
              <div>Receipts</div>
            </AppBox>
          </div>
        </PageContent>
      </>
    </>
  );
};
