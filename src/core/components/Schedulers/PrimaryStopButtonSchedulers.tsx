interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  title?: string;
}

export const PrimaryStopButtonSchedulers: React.FC<Props> = ({
  children,
  onClick,
  title,
}) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 sm:w-auto"
    >
      {children}
    </button>
  );
};
