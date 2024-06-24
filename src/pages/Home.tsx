import React from 'react';
import NoteForm from '../componenets/NoteForm';
import NoteList from '../componenets/NoteList';

const Home = () => {
  return (
    <>
      <NoteForm />
      <NoteList />
    </>
  );
};

export default Home;