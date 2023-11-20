import { Flex, Text } from '@chakra-ui/react';
import { AppColors } from '../../theme';

const Header: React.FC = () => {
  return (
    <Flex
      minW={'100vw'}
      h={'85px'}
      align={'center'}
      justify={'space-between'}
      px={8}
      borderBottom={`1px solid ${AppColors.highlight}`}
      color={'white'}
      bgColor={AppColors.tertiary}
    >
      <Text fontSize={'2xl'} fontWeight={'600'}>
        Personal Journal
      </Text>
    </Flex>
  );
};

export default Header;
