import {
    Flex,
    FlexProps,
    FormControl,
    FormLabel,
    Input,
    Textarea,
  } from '@chakra-ui/react';
  import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
  } from 'react-hook-form';
  
  export type AppInputType = 'text' | 'password' | 'number' | 'file' | 'time';
  
  export type AppInputProps<T extends FieldValues> = FlexProps & {
    control: Control<T>;
    name: Path<T>;
    error: FieldError | undefined;
    placeHolder?: string;
    label: string;
    textArea?: boolean;
    inputType?: AppInputType;
    min?: string;
    max?: string;
    rows?: number;
  };
  
  export const AppInput = <T extends FieldValues>({
    control,
    name,
    error,
    placeHolder,
    label,
    textArea = false,
    inputType = 'text',
    min,
    max,
    rows,
    ...props
  }: AppInputProps<T>) => {
    return (
      <Flex {...props}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormControl>
              <FormLabel>{label}</FormLabel>
              {!textArea ? (
                <Input
                  type={inputType}
                  name={name}
                  min={min}
                  placeholder={placeHolder}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                />
              ) : (
                <Textarea
                  name={name}
                  placeholder={placeHolder}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  rows={rows}
                />
              )}
              {error && <div style={{ color: 'red' }}>{error?.message}</div>}
            </FormControl>
          )}
        />
      </Flex>
    );
  };