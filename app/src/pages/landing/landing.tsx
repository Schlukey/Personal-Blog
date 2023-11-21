import { Flex } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';
import BlogDisplay from '../../components/app/blog-display/blog-display';

const LandingPage: React.FC = () => {
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
