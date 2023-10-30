interface Props {
  children?: React.ReactNode;
}

/**
 * BoxRowColumn is a component that organize the children in a row on large screens and in a column on small screens.
 */

export const BoxRowColumn: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col space-x-0 space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
      {children}
    </div>
  );
};
