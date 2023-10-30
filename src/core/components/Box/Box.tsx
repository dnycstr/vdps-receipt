interface Props {
  children?: React.ReactNode;
}

/**
 * Full width box with rounded corners and shadow.
 */

export const Box: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto w-full">
      <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
        {children}
      </div>
    </div>
  );
};
