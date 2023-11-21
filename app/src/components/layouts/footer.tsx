import { Flex, Text } from '@chakra-ui/react';
import { AppColors } from '../../theme';

const Footer: React.FC = () => {
  return (
    <Flex
      minW={'100vw'}
      h={'85px'}
      align={'center'}
      justify={'space-between'}
      px={8}
      borderTop={`2px solid ${AppColors.highlight}`}
      color={'white'}
      bgColor={AppColors.tertiary}
      boxShadow={'lg'}
    >
      <Text>this is for personal use only</Text>
    </Flex>
  );
};

export default Footer;
