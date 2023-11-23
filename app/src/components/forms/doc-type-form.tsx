import { Button, Stack, Text } from '@chakra-ui/react';
import { AppInput } from '../app/app-input/app-input';
import { BaseFormProps } from './base-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { DocType, DocTypeFormData } from '../../models/post';
import { AppColors } from '../../theme';

const docTypeDefaultFormValues = {
  title: '',
};

const docTypeFormDataSchema = yup.object({
  title: yup.string().required('Field is required'),
});

type DocTypeProps<T> = {
  form?: DocTypeFormData;
} & BaseFormProps<T>;

const DocTypeForm: React.FC<DocTypeProps<DocTypeFormData>> = ({
  form,
  onSubmit,
}) => {
  const {
    control: docControl,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<DocTypeFormData>({
    defaultValues: form || docTypeDefaultFormValues,
    resolver: yupResolver(docTypeFormDataSchema),
    mode: 'all',
  });
  return (
    <Stack spacing={4} p={6}>
      <AppInput<DocTypeFormData>
        name='title'
        control={docControl}
        error={errors.title}
        label='Title'
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        bgColor={AppColors.contentColor}
        _hover={{
          bgColor: `${AppColors.tertiary}`,
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        color={'whitesmoke'}
      >
        Save
      </Button>
    </Stack>
  );
};

export default DocTypeForm;
