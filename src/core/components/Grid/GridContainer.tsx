interface Props {
  children?: React.ReactNode;
}

export const GridContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-evenly bg-gray-50 max-w-full">
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 mx-8 my-8 w-full"
      >
        {children}
      </ul>
    </div>
  );
};
