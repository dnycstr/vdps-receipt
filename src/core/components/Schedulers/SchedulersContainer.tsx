interface iProps {
  children?: React.ReactNode;
  name: string;
}

export const SchedulersContainer: React.FC<iProps> = ({ children, name }) => {
  return (
    <div className="flex justify-between px-6 ">
      <h1 className="text-md font-semibold mb-4 text-gray-800">{name}</h1>
      {children}
    </div>
  );
};
