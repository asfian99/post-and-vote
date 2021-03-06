import React from "react";
import { Box, HStack, Text, Heading } from "@chakra-ui/core";
import VoteButton from "./VoteButton";
// import ActionButton from "./ActionButton";

const Post = ({ post }) => {
  // console.log("Post component post : " + post);
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButton post={post} />
      <Box bg="gray.100" p={4} rounded="md" w="100%">
        <Heading mb={2} as="h4" size="lg">
          {post.title}
        </Heading>
        <Text>{post.body}</Text>
      </Box>
    </HStack>
  );
};

export default Post;
