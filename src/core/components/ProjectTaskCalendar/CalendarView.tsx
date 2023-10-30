interface Props {
  children?: React.ReactNode;
}

export const CalendarView: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="w-full bg-gray-50 px-4 py-2">{children}</div>
    </>
  );
};
