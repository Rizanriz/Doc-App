import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, Button, TextField, Typography } from '@mui/material';
import { db } from '../services/firebase';


function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchDoc = async () => {
      if (id) {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
          setContent(docSnap.data().content);
        }
      }
    };

    fetchDoc();
  }, [id]);

  const handleSave = async () => {
    try {
      const docRef = id ? doc(db, "documents", id) : doc(collection(db, "documents"));
      await setDoc(docRef, { title, content });
      navigate('/');
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <Container style={{marginTop:"50px"}}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Document" : "New Document"}
      </Typography>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)}
        fullWidth margin="normal"/>
        
      <ReactQuill value={content} onChange={setContent} />
      <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Save
      </Button>
    </Container>
  );
}

export default Editor;
