import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useField, FieldHookConfig } from 'formik';
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

import { isJson } from '@utils/isJson';

interface BaseInputProps {
  haserror: boolean;
}

const BaseInput = tw.input<BaseInputProps>`
block w-full rounded-l-md shadow-sm  bg-white sm:text-sm
${(props) =>
  !props.haserror &&
  'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
${(props) =>
  props.haserror && 'border-red-300 focus:border-red-500 focus:ring-red-500'} 
`;

type Props = {
  label?: string;
  readonly?: boolean;
} & FieldHookConfig<string>;

export const MultiInput: React.FC<Props> = ({ label, readonly, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const initvalues = field.value
    ? isJson(field.value)
      ? JSON.parse(field.value)
      : [field.value]
    : [''];
  const [values, setValues] = useState<string[]>(initvalues);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        {values.map((value, index) => (
          <div key={index} className="mt-2 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <BaseInput
                type="text"
                value={value}
                readOnly={readonly}
                haserror={!!meta.error}
                onChange={(e) => {
                  const newValues = [...values];
                  newValues[index] = e.target.value;
                  setValues(newValues);
                  helpers.setValue(JSON.stringify(newValues));
                }}
              />
            </div>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => {
                const newValues = [...values];
                newValues.splice(index, 1);
                setValues(newValues);
                helpers.setValue(JSON.stringify(newValues));
              }}
            >
              <XMarkIcon
                className="-ml-0.5 h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="relative mt-2 -ml-px inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => {
            const newValues = [...values];
            newValues.push('');
            setValues(newValues);
          }}
        >
          <PlusIcon
            className="-ml-0.5 h-5 w-5 text-green-400"
            aria-hidden="true"
          />
          Add
        </button>
        {meta.error ? <div className="text-red-500">{meta.error}</div> : null}
      </div>
    </div>
  );
};
