import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { DocTypeFormData, EditDocTypeForm, Post } from '../../../models/post';
import { AppColors } from '../../../theme';
import { ViewIcon } from '@chakra-ui/icons';
import DocTypeForm from '../../forms/doc-type-form';
import {
  saveDocTypeTrigger,
  updateDocTypeTrigger,
} from '../../../api/doctypeApi';

export type BlogDisplayProps = {
  title: string;
  data: Post[];
};

const BlogDisplay: React.FC<BlogDisplayProps> = ({ title, data }) => {
  const datePosted = (x: Post) => {
    return new Date(x.dateCreated).toUTCString().slice(0, 14);
  };

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const upsertDocType = async (formData: any) => {
    let isEdit = formData.id ? true : false;
    try {
      if (!isEdit) {
        const saveForm = formData as DocTypeFormData;
        await saveDocTypeTrigger({
          title: saveForm.title,
        });
      } else {
        const editForm = formData as EditDocTypeForm;
        await updateDocTypeTrigger(editForm.id, {
          id: editForm.id ?? '',
          title: editForm.title,
        });
      }
      toast({
        title: 'DocType saved',
        description: 'The DocType was saved',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Something went wrong there',
        description: `this happend ${e}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex w={'full'} p={8} direction={'column'} gap={4} color={'white'}>
      <Flex justify={'space-between'} w={'full'} align={'center'}>
        <Text fontSize={'3xl'} fontWeight={'600'} color={AppColors.tertiary}>
          {title}
        </Text>
        <Button
          bgColor={AppColors.contentColor}
          size={'sm'}
          borderRadius={'full'}
          _hover={{
            bgColor: `${AppColors.tertiary}`,
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          color={'white'}
          onClick={onOpen}
        >
          New DocType
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add DocType</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <DocTypeForm
                onSubmit={async (formData) => {
                  await upsertDocType(formData);
                }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
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
              gap={{ base: 3, md: 'auto' }}
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
