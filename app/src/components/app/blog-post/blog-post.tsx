import { Flex, Text } from '@chakra-ui/react';
import { AppColors } from '../../../theme';
import { Post } from '../../../models/post';

export type BlogPostProps = {
  item: Post;
};

const BlogPost: React.FC<BlogPostProps> = ({ item }) => {
    const datePosted = (x: Post) => {
        return new Date(x.dateCreated).toUTCString().slice(0, 14);
      };
  return (
    <Flex
      direction={'column'}
      p={8}
      w={'full'}
      borderRadius={'2xl'}
      boxShadow={'lg'}
      bgColor={AppColors.contentColor}
      gap={6}
    >
      <Flex justify={'space-between'}>
      <Text fontSize={'2xl'} fontWeight={'600'} color={'white'}>
        {item?.title}
      </Text>
      <Text color={'white'}>{datePosted(item)}</Text>
      </Flex>
      <Text color={'white'}>{item?.content}</Text>
    </Flex>
  );
};

export default BlogPost
