interface Props {
  children?: React.ReactNode;
}

export const FormBorderedContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-lg border-2 border-gray-200 p-4">{children}</div>
    </div>
  );
};
