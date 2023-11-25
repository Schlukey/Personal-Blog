import { Flex, Text, Button } from '@chakra-ui/react';
import TextRenderer from '../app-text-renderer/app-text-renderer';
import { Post } from '../../../models/post';
import { AppColors } from '../../../theme';
import { ViewIcon } from '@chakra-ui/icons';

export type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const datePosted = (x: Post) => {
    return new Date(x.dateCreated).toUTCString().slice(0, 14);
  };
  return (
    <Flex
      w={'full'}
      p={6}
      direction={'column'}
      borderRadius={'2xl'}
      color={'black'}
      bgColor={'whitesmoke'}
      boxShadow={'lg'}
      my={3}
    >
      <Flex w={'full'} justify={'space-between'} align={'center'}>
        <Text fontSize={'xl'} fontWeight={'600'}>
          {post.title}
        </Text>
        <Text>{datePosted(post)}</Text>
      </Flex>
      <Flex
        w={'full'}
        justify={'space-between'}
        align={{ base: 'start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 3, md: 'auto' }}
      >
        <Flex gap={2}>
          <TextRenderer markdown={`${post.content?.slice(0, 100)}`} />
        </Flex>
        <Button
          bgColor={'white'}
          color={AppColors.secondary}
          onClick={() => window.open(`/posts/${post.id}`)}
          _hover={{
            bgColor: 'white',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            color: AppColors.secondary,
          }}
          borderRadius={'full'}
        >
          <ViewIcon />
        </Button>
      </Flex>
    </Flex>
  );
};
export default PostCard;
