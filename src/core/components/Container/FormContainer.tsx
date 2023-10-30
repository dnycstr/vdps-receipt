interface Props {
  children?: React.ReactNode;
}

export const FormContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-8 divide-y bg-white divide-gray-200">
        {children}
      </div>
    </div>
  );
};
