import { Flex } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';
import BlogDisplay from '../../components/app/blog-display/blog-display';
import { findAllPosts, findPostById } from '../../api/postApi';

const LandingPage: React.FC = () => {
  const posts = findAllPosts()
  console.log('posts', posts)
  return (
    <Flex
      direction={'column'}
      w={'full'}
      bgColor={AppColors.appBackgroundLight}
      minH={'100vh'}
      pos={'relative'}
    >
      <Header />
      <BlogDisplay title='Posts' data={[]} />
    </Flex>
  );
};

export default LandingPage;
