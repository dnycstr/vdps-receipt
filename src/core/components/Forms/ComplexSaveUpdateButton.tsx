import { PencilSquareIcon } from '@heroicons/react/20/solid';
import tw from 'tailwind-styled-components';

interface ButtonProps {
  disabled: boolean;
}

const BaseButton = tw.button<ButtonProps>`
relative -ml-px inline-flex items-center space-x-2  border-hidden border-gray-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-100 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500
${(props) => props.disabled && 'cursor-not-allowed'} 
`;

interface Props {
  label?: string;
  disabled: boolean;
}

export const ComplexSaveUpdateButton: React.FC<Props> = ({
  label,
  disabled,
}) => {
  return (
    <BaseButton type="submit" disabled={disabled}>
      <PencilSquareIcon className="h-5 w-5 text-white-400" aria-hidden="true" />
      <span>{label}</span>
    </BaseButton>
  );
};
