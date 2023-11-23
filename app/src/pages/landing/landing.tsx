import React, { useState, useEffect } from 'react';
import { DocType, Post } from '../../models/post';
import { Flex } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';
import BlogDisplay from '../../components/app/blog-display/blog-display';
import { findAllPosts } from '../../api/postApi';
import { findAllDocTypes } from '../../api/doctypeApi';

const LandingPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [doctypes, setDocTypes] = useState<DocType[]>([]);

  useEffect(() => {
    findAllPosts()
      .then(({ data: postsData }) => setPosts(postsData))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    findAllDocTypes()
      .then(({ data: doctypesData }) => {
        setDocTypes(doctypesData);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log('doctypes', doctypes);

  return (
    <Flex
      direction={'column'}
      w={'full'}
      bgColor={AppColors.appBackgroundLight}
      minH={'100vh'}
      pos={'relative'}
    >
      <Header />
      <BlogDisplay title='Posts' data={posts || []} />
    </Flex>
  );
};

export default LandingPage;
