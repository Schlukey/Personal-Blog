import { Flex } from '@chakra-ui/react';
import Header from '../../components/layouts/header';
import { AppColors } from '../../theme';

const LandingPage: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      w={'full'}
      bgColor={AppColors.appBackground}
      minH={'100vh'}
    >
      <Header />
    </Flex>
  );
};

export default LandingPage;
