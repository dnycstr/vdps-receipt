import { useField, FieldHookConfig } from 'formik';
import tw from 'tailwind-styled-components';

interface BaseSelectProps {
  hasError: boolean;
}

const BaseSelect = tw.select<BaseSelectProps>`
mt-1 block w-full rounded-md  py-2 pl-3 pr-10 text-base  focus:outline-none  sm:text-sm
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
  selection: SelectOptions[];
} & FieldHookConfig<string>;

export const SelectFormik: React.FC<Props> = ({
  label,
  selection,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <BaseSelect {...field} hasError={!!meta.error}>
        {selection.map((row, index) => (
          <option key={index} value={row.value}>
            {row.text}
          </option>
        ))}
      </BaseSelect>
      {meta.error ? <div className="text-red-500">{meta.error}</div> : null}
    </div>
  );
};
