import { Flex } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';

const Posts: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      w={'full'}
      bgColor={AppColors.appBackgroundLight}
      minH={'100vh'}
    >
      <Header />
    </Flex>
  );
};

export default Posts;
