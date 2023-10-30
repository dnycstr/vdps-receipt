import { CloseButtonIcon } from '@components/Icons/CloseButtonIcon';

interface Props {
  onCLick?: () => void;
}

export const CloseButton: React.FC<Props> = ({ onCLick }) => {
  return (
    <>
      <div className="flex justify-end py-2 px-2">
        <button
          className="flex justify-center text-sm font-medium text-gray-700"
          onClick={onCLick}
        >
          <CloseButtonIcon />
        </button>
      </div>
    </>
  );
};
