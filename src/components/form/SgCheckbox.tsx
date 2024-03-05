// import { useController } from 'react-hook-form';
// import { Checkbox, CheckboxProps } from '@mui/material';
//
// interface SgCheckboxProps extends Omit<CheckboxProps, 'label'> {
//   label: string;
//   name: string;
//   control: any;
//   onChange?: (e: any) => void;
// }
//
// export const SgCheckbox = (props: SgCheckboxProps) => {
//   const { label, name, control, onChange, defaultChecked } = props;
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { checked } = e.target;
//     if (onChange) {
//       onChange(checked);
//     }
//   };
//
//   const { field } = useController({
//     name,
//     control,
//     defaultValue: true,
//   });
//
//   return (
//     <span>
//       <Checkbox
//         {...field}
//         {...props}
//         defaultChecked={defaultChecked}
//         onChange={handleChange}
//       />{' '}
//       {label}
//     </span>
//   );
// };

import { Controller, useController } from 'react-hook-form';
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

interface SgCheckboxProps extends Omit<CheckboxProps, 'label'> {
  label: string;
  name: string;
  control: any;
  onChange?: (e: any) => void;
}

export const SgCheckbox = (props: SgCheckboxProps) => {
  const { label, name, control, onChange, defaultChecked } = props;

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked } = e.target;
  //   if (onChange) {
  //     onChange(checked);
  //   }
  // };

  const { field } = useController({
    name,
    control,
    defaultValue: true,
  });

  return (
    <Controller
      name={name}
      control={control}
      key={name}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!value}
              onChange={(event, item) => {
                onChange(item);
              }}
              name={name}
              color="primary"
            />
          }
          label={label}
        />
      )}
    />

    // <span>
    //   <Checkbox
    //     {...field}
    //     {...props}
    //     defaultChecked={defaultChecked}
    //     onChange={handleChange}
    //   />{' '}
    //   {label}
    // </span>
  );
};
