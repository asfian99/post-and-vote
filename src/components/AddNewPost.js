import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  useDisclosure,
} from "@chakra-ui/core";
import db from "../lib/firebase";

const AddNewPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // eslint-disable-next-line
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    const date = new Date();

    await db.collection("post").add({
      title,
      body,
      upVotesCount: 0,
      downVotesCount: 0,
      createdAt: date.toString(),
      updatedAt: date.toString(),
    });
    onClose();
    setTitle("");
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add New Post
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add New Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="post-title">
                <FormLabel>Post Title</FormLabel>
                <Input
                  type="post-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="post-title">
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="post-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <HStack spacing={4}>
                <Button onClick={onClose}>Close</Button>
                <Button
                  onClick={handleSubmit}
                  colorScheme="blue"
                  disabled={!title.trim()}
                  isLoading={isSaving}
                >
                  Save
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default AddNewPost;
