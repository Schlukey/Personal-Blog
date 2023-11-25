import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Flex, FlexProps, FormControl, FormLabel } from '@chakra-ui/react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

export type AppMarkdownProps<T extends FieldValues> = FlexProps & {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
  label: string;
};

export const AppMarkdown = <T extends FieldValues>({
  control,
  name,
  error,
  label,
  ...props
}: AppMarkdownProps<T>) => {
  return (
    <Flex {...props} pb={{base: 16, md: 12}}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <FormControl>
            <FormLabel>{label}</FormLabel>
            <ReactQuill
              theme='snow'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              style={{
                width: 'full',
                height: '200px',
              }}
            />
            {error && <div style={{ color: 'red' }}>{error?.message}</div>}
          </FormControl>
        )}
      />
    </Flex>
  );
};
