import React, { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';
import { useParams } from 'react-router-dom';
import { findPostById } from '../../api/postApi';
import { Post } from '../../models/post';
import BlogPost from '../../components/app/blog-post/blog-post';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../router/router';

const Posts: React.FC = () => {
  const id = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();

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
      maxW={'100vw'}
      bgColor={AppColors.appBackgroundLight}
      minH={'100vh'}
      overflow={'hidden'}
      gap={12}
    >
      <Header />
      <Flex px={{ base: 3, md: 8 }}>
        <Button
          borderRadius={'full'}
          bgColor={'white'}
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg', bgColor: 'white' }}
          onClick={() => navigate(RoutesList.Landing)}
        >
          Back
        </Button>
      </Flex>
      <Flex direction={'column'} w={'full'} px={{ base: 3, md: 8 }}>
        <BlogPost item={post || ({} as Post)} />
      </Flex>
    </Flex>
  );
};

export default Posts;
