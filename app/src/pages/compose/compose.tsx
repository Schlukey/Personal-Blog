import { Flex, Text, useToast } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';
import PostEntryForm from '../../components/forms/blog-form';
import { EditPostForm, PostForm } from '../../models/post';
import { savePostTrigger, updatePostTrigger } from '../../api/postApi';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../router/router';

const Compose: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const upsertPost = async (formData: any) => {
    let eddittedPost = formData.id ? true : false;
    try {
      if (!eddittedPost) {
        const savePost = formData as PostForm;
        await savePostTrigger({
          title: savePost.title,
          content: savePost.content,
          docType: savePost.docType,
        });
      } else {
        const editPost = formData as EditPostForm;
        await updatePostTrigger(editPost.id, {
          id: editPost.id ?? '',
          title: editPost.title,
          content: editPost.content,
          docType: editPost.docType,
        });
        eddittedPost = true;
      }
      toast({
        title: 'Post saved!',
        description: 'The post was saved',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Something went wrong there',
        description: `this is it: ${e}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      direction={'column'}
      w={'full'}
      bgColor={AppColors.appBackgroundLight}
      minH={'100vh'}
      align={'center'}
      gap={8}
      pb={{base: 4, md: 0}}
    >
      <Header />
      <Text fontSize={'2xl'} fontWeight={'600'} color={AppColors.highlight}>
        New Entry
      </Text>
      <Flex
        bgColor={'white'}
        borderRadius={'2xl'}
        boxShadow={'lg'}
        w={{base: '350px', md: '600px'}}
        p={{base: 3, md: 6}}
      >
        <PostEntryForm
          onSubmit={async (formData) => {
            console.log('this is the form', formData);
            await upsertPost(formData);
            navigate(RoutesList.Landing);
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Compose;
