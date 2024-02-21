import { PlusIcon } from '@heroicons/react/20/solid';
import { useField, FieldHookConfig } from 'formik';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

import { isJson } from '@utils/isJson';

interface BaseInputProps {
  haserror: boolean;
}

const BaseLeftInput = tw.input<BaseInputProps>`
 w-80 rounded-l-md shadow-sm bg-white sm:text-sm
${(props) =>
  !props.haserror &&
  'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
${(props) =>
  props.haserror && 'border-red-300 focus:border-red-500 focus:ring-red-500'} 
`;

const BaseRightInput = tw.input<BaseInputProps>`
w-3/10 rounded-r-md shadow-sm text-right bg-white sm:text-sm
${(props) =>
  !props.haserror &&
  'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
${(props) =>
  props.haserror && 'border-red-300 focus:border-red-500 focus:ring-red-500'} 
`;

export interface KeyValuePair {
  key: string;
  value: string;
}

type Props = {
  label?: string;
  kvpValues?: KeyValuePair[];
  readonly?: boolean;
} & FieldHookConfig<string>;

export const MultiPairInput: React.FC<Props> = ({
  label,
  readonly,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const initvalues = field.value
    ? isJson(field.value)
      ? (JSON.parse(field.value) as KeyValuePair[])
      : [{ key: '', value: '0' }]
    : [{ key: '', value: '0' }];

  const [kvpValues, setKvpValues] = useState<KeyValuePair[]>(initvalues);

  useEffect(() => {
    const kvp = field.value
      ? isJson(field.value)
        ? (JSON.parse(field.value) as KeyValuePair[])
        : [{ key: '', value: '0' }]
      : [{ key: '', value: '0' }];
    setKvpValues(kvp);
  }, [field.value]);

  if (kvpValues.length === 0) {
    return <></>;
  } else {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="w-full mt-1">
          {kvpValues.map((kvp, index) => (
            <div key={index} className="w-full mt-1">
              <BaseLeftInput
                type="text"
                value={kvp.key}
                readOnly={readonly}
                haserror={!!meta.error}
                onChange={(e) => {
                  const newKvpValues = [...kvpValues];
                  newKvpValues[index].key = e.target.value;
                  helpers.setValue(JSON.stringify(newKvpValues));
                }}
              />
              <BaseRightInput
                type="text"
                value={kvp.value}
                readOnly={readonly}
                haserror={!!meta.error}
                onChange={(e) => {
                  const newKvpValues = [...kvpValues];
                  newKvpValues[index].value = e.target.value;
                  helpers.setValue(JSON.stringify(newKvpValues));
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="relative mt-2 -ml-px inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => {
              const newValues = [...kvpValues];
              newValues.push({ key: '', value: '0' });
              setKvpValues(newValues);
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
  }
};
