import React, { useState, useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';
import { useParams } from 'react-router-dom';
import { findPostById } from '../../api/postApi';
import { Post } from '../../models/post';
import BlogPost from '../../components/app/blog-post/blog-post';

const Posts: React.FC = () => {
  const id = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>();
  console.log('this is what the id looks like', id.id);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await findPostById(id.id!);
        console.log('API response:', response);
        setPost(response.data as Post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostById();
  }, [id]);

  useEffect(() => {
    console.log('this is the post', post);
  }, [post]);

  return (
    <Flex
      direction={'column'}
      w={'full'}
      bgColor={AppColors.appBackgroundLight}
      minH={'100vh'}
      gap={12}
    >
      <Header />
      <Flex direction={'column'} w={'full'} px={12}>
        <BlogPost item={post || {} as Post} />
      </Flex>
    </Flex>
  );
};

export default Posts;
