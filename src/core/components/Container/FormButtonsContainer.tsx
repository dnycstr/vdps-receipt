interface Props {
  children?: React.ReactNode;
}

export const FormButtonsContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="flex justify-end">{children}</div>
    </div>
  );
};
