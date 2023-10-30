import tw from 'tailwind-styled-components';

const BaseButton = tw.button`
relative -ml-px inline-flex items-center space-x-2  border-hidden border-gray-300 bg-green-200 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500

`;

interface Props {
  onClick: () => void;
}

export const ComplexPassButton: React.FC<Props> = ({ onClick }) => {
  return (
    <BaseButton type="button" onClick={() => onClick()}>
      <span>Pass</span>
    </BaseButton>
  );
};
