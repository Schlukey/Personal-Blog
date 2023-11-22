import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { AppColors } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../router/router';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex
      minW={'100vw'}
      h={'85px'}
      align={'center'}
      justify={'space-between'}
      px={8}
      borderBottom={`2px solid ${AppColors.highlight}`}
      color={'white'}
      bgColor={AppColors.tertiary}
      boxShadow={'lg'}
    >
      <Box>
        <Text fontSize={{base: 'lg', md:'2xl'}} fontWeight={'600'}>
          Personal Journal
        </Text>
      </Box>
      <Flex gap={{base: 1, md: 4}} align={'center'} justify={'flex-end'}>
        <Link
          onClick={() => navigate(RoutesList.Landing)}
          _hover={{
            color: `${AppColors.primary}`,
          }}
        >
          Home
        </Link>
        <Link
          onClick={() => navigate(RoutesList.Compose)}
          _hover={{
            color: `${AppColors.primary}`,
          }}
        >
          Compose
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
