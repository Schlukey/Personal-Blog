import { Flex, Text } from '@chakra-ui/react';
import { Post } from '../../../models/post';
import { AppColors } from '../../../theme';

export type BlogDisplayProps = {
  title: string;
  data: Post[];
};

const BlogDisplay: React.FC<BlogDisplayProps> = ({
  title,
  data,
}) => {
  return (
    <Flex w={'full'} p={8}>
      <Text fontSize={'2xl'} fontWeight={'bold'} color={AppColors.tertiary}>{title}</Text>
      {data.map((x) => {
        return (
          <Flex
            w={'full'}
            direction={'column'}
            borderRadius={'2xl'}
            bgColor={'transparent'}
            boxShadow={'sm'}
            _hover={{
              transform: 'translateY(-2px)',
              transition: '0.2s',
              boxShadow: 'lg',
              bgColor: 'transparent',
            }}
            key={x.id}
          >
            <Flex w={'full'} justify={'space-between'} align={'center'}>
              <Text fontSize={'xl'} fontWeight={'600'}>
                {x.title}
              </Text>
              <Text>{x.dateCreated}</Text>
            </Flex>
            <Text>{`${x.content.slice(0, 100)}...`}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default BlogDisplay;
