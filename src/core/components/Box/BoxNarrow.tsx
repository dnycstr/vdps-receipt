interface Props {
  children?: React.ReactNode;
}

/**
 * Narrow width box with rounded corners and shadow.
 */

export const BoxNarrow: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto w-full lg:max-w-md">
      <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
        {children}
      </div>
    </div>
  );
};
