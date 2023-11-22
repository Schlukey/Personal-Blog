import { Button, Flex, Text } from '@chakra-ui/react';
import { Post } from '../../../models/post';
import { AppColors } from '../../../theme';
import { ViewIcon } from '@chakra-ui/icons';

export type BlogDisplayProps = {
  title: string;
  data: Post[];
};

const BlogDisplay: React.FC<BlogDisplayProps> = ({ title, data }) => {
  const datePosted = (x: Post) => {
    return new Date(x.dateCreated).toUTCString().slice(0, 14);
  };

  return (
    <Flex w={'full'} p={8} direction={'column'} gap={4} color={'white'}>
      <Text fontSize={'3xl'} fontWeight={'600'} color={AppColors.tertiary}>
        {title}
      </Text>
      {data.map((x: Post, index: number) => {
        return (
          <Flex
            w={'full'}
            p={6}
            direction={'column'}
            borderRadius={'2xl'}
            bgColor={AppColors.contentColor}
            boxShadow={'sm'}
            _hover={{
              transform: 'translateY(-2px)',
              transition: '0.2s',
              boxShadow: 'lg',
              bgColor: `${AppColors.contentColor}`,
            }}
            key={index}
            gap={3}
          >
            <Flex w={'full'} justify={'space-between'} align={'center'}>
              <Text fontSize={'xl'} fontWeight={'600'}>
                {x.title}
              </Text>
              <Text>{datePosted(x)}</Text>
            </Flex>
            <Flex
              w={'full'}
              justify={'space-between'}
              align={{ base: 'start', md: 'center' }}
              direction={{ base: 'column', md: 'row' }}
              gap={{base: 3, md: 'auto'}}
            >
              <Text>{`${x.content?.slice(0, 100)}...`}</Text>
              <Button
                bgColor={'whitesmoke'}
                onClick={() => window.open(`/posts/${x.id}`, '_blank')}
                _hover={{
                  bgColor: 'whitesmoke',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                <ViewIcon />
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default BlogDisplay;
