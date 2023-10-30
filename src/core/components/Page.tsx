import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

interface PageHeadingProps {
  children?: React.ReactNode;
}

const Container = tw.div`mx-auto max-w-7xl px-4 sm:px-6 md:px-8`;

export const PageHeading: React.FC<PageHeadingProps> = ({ children }) => {
  return (
    <Container>
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {children}
        </h2>
      </div>
      <div className="my-6 border-b border-gray-200"></div>
    </Container>
  );
};

interface PageContentProps {
  children?: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

interface BreadCrumbsProps {
  mainMenuLabel: string;
  mainMenuRoutes: string;
  subMenuLabel: string;
  subMenuRoutes: string;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  mainMenuLabel,
  mainMenuRoutes,
  subMenuLabel,
  subMenuRoutes,
}) => {
  return (
    <Container>
      <div className="min-w-0 flex space-x-2">
        <Link
          to={mainMenuRoutes}
          className="text-sm font-semibold leading-7 text-gray-500 sm:truncate sm:text-md sm:tracking-tight"
        >
          {mainMenuLabel}
        </Link>
        <span className="flex items-center">
          <ChevronRightIcon className="h-4 w-4" />
        </span>
        <Link
          to={subMenuRoutes}
          className="text-sm font-semibold leading-7 text-gray-700 sm:truncate sm:text-md sm:tracking-tight"
        >
          {subMenuLabel}
        </Link>
      </div>
      <div className="my-6 border-b border-gray-200"></div>
    </Container>
  );
};
