import tw from 'tailwind-styled-components';

interface BaseSelectProps {
  hasError: boolean;
}

const BaseSelect = tw.select<BaseSelectProps>`
mt-1 block w-64 rounded-md  py-2 pl-3 pr-10 text-base  focus:outline-none  sm:text-sm
${(props) =>
  !props.hasError &&
  'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
${(props) =>
  props.hasError && 'border-red-300 focus:border-red-500 focus:ring-red-500'} 
`;

interface SelectOptions {
  selected?: boolean;
  value: string;
  text: string;
}

type Props = {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  selection: SelectOptions[];
  changeHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<Props> = ({
  label,
  placeholder,
  defaultValue,
  selection,
  changeHandler,
}) => {
  return (
    <div className="w-64">
      <label className="block w-40 text-sm font-medium text-gray-700">
        {label}
      </label>
      <BaseSelect
        hasError={false}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={changeHandler}
      >
        {selection.map((row, index) => (
          <option key={index} value={row.value}>
            {row.text}
          </option>
        ))}
      </BaseSelect>
    </div>
  );
};
