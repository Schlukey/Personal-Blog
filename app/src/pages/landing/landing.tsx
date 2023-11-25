import React, { useState, useEffect } from 'react';
import { Post } from '../../models/post';
import { Flex } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';
import BlogDisplay from '../../components/app/blog-display/blog-display';
import { findAllPosts } from '../../api/postApi';

const LandingPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    findAllPosts()
      .then(({ data: postsData }) => setPosts(postsData))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Flex
      direction={'column'}
      maxW={'100vw'}
      bgColor={AppColors.appBackgroundLight}
      minH={'100vh'}
      overflow={'hidden'}
    >
      <Header />
      <BlogDisplay title='Posts' data={posts || []} />
    </Flex>
  );
};

export default LandingPage;
