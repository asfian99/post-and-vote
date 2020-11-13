import React, { useEffect, useState } from "react";
// components
import { Container, VStack } from "@chakra-ui/core";
import Post from "./components/Post";
import Navbar from "./components/Navbar";
// database
import db from "./lib/firebase";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // This hook will handle initial fetching

    db.collection("post")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(querySnapshot);
        setPosts(data);
      });
  }, []);

  useEffect(() => {
    // Hook to handle the real-time updating of posts whenever there is a
    // change in the datastore (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)

    db.collection("post")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _posts = [];

        querySnapshot.forEach((doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPosts(_posts);
      });
  }, []);

  // console.log("post : " + posts);
  return (
    <>
      <Navbar />
      <Container maxW="md" centerContent p={8}>
        <VStack spacing={8} w="100%">
          {posts.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
        </VStack>
      </Container>
    </>
  );
}

export default App;
