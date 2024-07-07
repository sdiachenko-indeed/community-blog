import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchUsersWithPosts } from "../api";
import ErrorMessage from "../common/ErrorMessage";

export const CardList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(undefined);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    fetchUsersWithPosts(abortController.signal)
      .then(response => {
          setUsers(response);
      })
      .catch(error => {
        setError(error);
      });

    return () => abortController.abort();
  }, []);

  
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Check if users is an array before mapping
  const list = Array.isArray(users) ? users.map((user) => (
    <Card key={user.id} user={user} />
  )) : null;


  return (
    <main className="container">
      <section className="row">{list}</section>
    </main>
  );
};

export default CardList;
