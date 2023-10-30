interface Props {
  title?: string;
  children?: React.ReactNode;
}

/**
 * BoxHeader is a component that is used to display a header in a box.
 * Put this inside the Box, BoxMedium, or BoxNarrow component.
 *
 */

export const BoxHeader: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
        </div>
        {children}
      </div>
    </div>
  );
};
