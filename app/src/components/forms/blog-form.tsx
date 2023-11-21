import React, { useState, useEffect } from 'react';
import { BaseFormProps } from './base-form';
import { Button, Select, Stack, Text } from '@chakra-ui/react';
import { AppInput } from '../app/app-input/app-input';
import { DocType, PostForm } from '../../models/post';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { AppColors } from '../../theme';

const postFormDefaultValues: PostForm = {
  title: '',
  docType: undefined,
  content: '',
};

const postFormDataSchema = yup.object({
  title: yup.string().required('Each Post needs a title'),
  content: yup.string().required('It needs some content...'),
});

type PostFormProps<T> = {
  form?: PostForm;
} & BaseFormProps<T>;

const PostEntryForm: React.FC<PostFormProps<PostForm>> = ({
  form,
  onSubmit,
}) => {
  const {
    control: postControl,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<PostForm>({
    defaultValues: form || postFormDefaultValues,
    resolver: yupResolver(postFormDataSchema),
    mode: 'onChange',
  });

  const [categories, setCategories] = useState<string[]>();
  const currentCategories = Object.values(DocType).filter(
    (x) => typeof x !== 'number'
  ) as string[];

  useEffect(() => {
    setCategories(currentCategories);
  }, []);

  return (
    <Stack spacing={4} w={'full'}>
      <Text fontSize={'xl'} fontWeight={'600'}>
        What's this about
      </Text>
      <Select>
        {categories?.map((x) => {
          return (
            <option
              key={x}
              value={`${x}`}
              onClick={() => setValue('docType', x)}
            >
              {x}
            </option>
          );
        })}
      </Select>
      <AppInput<PostForm>
        name='title'
        control={postControl}
        error={errors.title}
        label='Title'
        placeHolder='Title'
      />
      <AppInput<PostForm>
        textArea
        control={postControl}
        name='content'
        error={errors.content}
        label='Content'
        placeHolder='Everything else goes here'
        rows={8}
      />
      <Button
        bgColor={'transparent'}
        borderRadius={'full'}
        border={`1px solid ${AppColors.contentColor}`}
        color={AppColors.highlight}
        onClick={handleSubmit(onSubmit)}
        isDisabled={!isValid}
      >
        Save
      </Button>
    </Stack>
  );
};

export default PostEntryForm;
