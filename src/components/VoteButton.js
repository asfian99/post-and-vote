import React, { useEffect, useState } from "react";
import { IconButton, Text, VStack } from "@chakra-ui/core";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";

const VoteButton = ({ post }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [votedPost, setVotedPost] = useState([]);

  useEffect(() => {
    // Fetch the previously voted items from localStorage
    const votesFromLocalStorage = localStorage.getItem("votes") || [];
    let previousVotes = [];

    try {
      // Parse the value of the item from localStorage. If the value of the
      // items isn't an array, then JS will throw an error.
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (err) {
      console.log(err);
    }

    setVotedPost(previousVotes);
  }, []);

  const handleDisablingOfVoting = (postId) => {
    // This function is responsible for disabling the voting button after a
    // user has voted. Fetch the previously voted items from localStorage. See
    // https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse"
    // and update the item on localStorage.
    const previousVotes = votedPost;
    previousVotes.push(postId);

    setVotedPost(previousVotes);

    // Update the voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.stringify" and update the item on localStorage.
    localStorage.setItem("votes", JSON.stringify(votedPost));
  };

  const handleClick = async (type) => {
    // asign in temporary variabel
    setIsVoting(true);
    let upVotesCount = post.upVotesCount;
    let downVotesCount = post.downVotesCount;
    const date = new Date();

    // calculation
    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    await db.collection("post").doc(post.id).set({
      title: post.title,
      body: post.body,
      upVotesCount,
      downVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toString(),
    });

    // Disable the voting button once the voting is successful.
    handleDisablingOfVoting(post.id);
    setIsVoting(true);
  };

  const checkVoted = () => {
    if (votedPost.indexOf(post.id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {/* Upvote */}
      <VStack>
        <IconButton
          size="lg"
          colorScheme="purple"
          aria-label="Upvote"
          icon={<FiArrowUp />}
          onClick={() => handleClick("upvote")}
          isLoading={isVoting}
          isDisabled={checkVoted()}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.upVotesCount}
        </Text>
      </VStack>
      {/* Downvote */}
      <VStack>
        <IconButton
          size="lg"
          colorScheme="yellow"
          aria-label="Downvote"
          icon={<FiArrowDown />}
          onClick={() => handleClick("downvote")}
          isLoading={isVoting}
          isDisabled={checkVoted()}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.downVotesCount}
        </Text>
      </VStack>
    </>
  );
};

export default VoteButton;
