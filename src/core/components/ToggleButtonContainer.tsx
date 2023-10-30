interface Props {
  children?: React.ReactNode;
}

export const ToggleButtonContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-end border-b pr-4">
      <div className="flex justify-center m-2 space-x-1 rounded-2xl bg-[#000080]">
        {children}
      </div>
    </div>
  );
};
