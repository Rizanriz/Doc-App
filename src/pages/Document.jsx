import React from 'react';
import Editor from '../components/Editor';
import { useParams } from 'react-router-dom';

function Document() {
  const { id } = useParams();

  return (
    <div>
      <h1>Document {id}</h1>
      <Editor docId={id} />
    </div>
  );
}

export default Document;
