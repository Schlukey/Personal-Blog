import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { Post } from '../../../models/post';
import { AppColors } from '../../../theme';
import PostCard from '../app-post-card/app-post-card';

export type BlogDisplayProps = {
  title: string;
  data: Post[];
};

const BlogDisplay: React.FC<BlogDisplayProps> = ({ title, data }) => {
  const notes = data.filter((x) => x.docType === 'note');
  const theologyNotes = data.filter((x) => x.docType === 'theology');
  const journalEntries = data.filter((x) => x.docType === 'personal');

  return (
    <Flex w={'full'} p={8} direction={'column'} gap={4} color={'white'}>
      <Flex justify={'space-between'} w={'full'} align={'center'}>
        <Text fontSize={'3xl'} fontWeight={'600'} color={AppColors.tertiary}>
          {title}
        </Text>
      </Flex>

      <Tabs isFitted colorScheme='green.300' color={AppColors.tertiary}>
        <TabList>
          <Tab>Note</Tab>
          <Tab>Theology</Tab>
          <Tab>Personal</Tab>
        </TabList>
        <TabPanels>
          <TabPanel gap={3}>
            {notes.map((x) => {
              return <PostCard post={x} key={x.id} />;
            })}
          </TabPanel>
          <TabPanel>
            {theologyNotes.map((x) => {
              return <PostCard post={x} key={x.id} />;
            })}
          </TabPanel>
          <TabPanel>
            {journalEntries.map((x) => {
              return <PostCard post={x} key={x.id} />;
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default BlogDisplay;
