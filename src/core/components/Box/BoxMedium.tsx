interface Props {
  children?: React.ReactNode;
}

/**
 * Medium width box with rounded corners and shadow.
 */

export const BoxMedium: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto w-full lg:max-w-3xl">
      <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
        {children}
      </div>
    </div>
  );
};
