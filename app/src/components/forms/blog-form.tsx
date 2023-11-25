import React, { useState } from 'react';
import { BaseFormProps } from './base-form';
import { Button, Flex, Select, Stack, Text } from '@chakra-ui/react';
import { AppInput } from '../app/app-input/app-input';
import { PostForm } from '../../models/post';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { AppColors } from '../../theme';
import { AppMarkdown } from '../app/app-markdown/app-markdown';

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
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<PostForm>({
    defaultValues: form || postFormDefaultValues,
    resolver: yupResolver(postFormDataSchema),
    mode: 'onChange',
  });

  const selectOptions = ['note', 'personal', 'theology'];

  const [warning, setWarning] = useState<string>('none');

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectItem = e.currentTarget.value;
    setValue('docType', selectItem);
  };

  const handleFormSubmit = () => {
    const formValues = getValues();
    let isValid = true;
    if (!formValues.docType) {
      setWarning('flex');
      setTimeout(() => {
        setWarning('none');
      }, 5000);
      isValid = false;
    }
    if (!isValid) return;

    return onSubmit(formValues);
  };

  return (
    <Stack spacing={4} w={'full'} py={{base: 6, md: 0}}>
      <Text fontSize={'xl'} fontWeight={'600'}>
        What's this about
      </Text>
      <Select placeholder='Doc Type' onChange={onSelectChange}>
        {selectOptions.map((x) => {
          return (
            <option value={x} key={x}>
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
      <AppMarkdown<PostForm>
        name='content'
        control={postControl}
        error={errors.content}
        label=''
      />
      <Button
        bgColor={'transparent'}
        borderRadius={'full'}
        border={`1px solid ${AppColors.contentColor}`}
        color={AppColors.highlight}
        onClick={handleFormSubmit}
        isDisabled={!isValid}
      >
        Save
      </Button>
      <Flex
        display={warning}
        bgColor={'red.400'}
        direction={'column'}
        w={'full'}
        p={4}
      >
        <Text fontSize={'lg'} color={'white'}>
          Please enter a doc type
        </Text>
      </Flex>
    </Stack>
  );
};

export default PostEntryForm;
