import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '../services/firebase';
import './Home.css'

function Home() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const querySnapshot = await getDocs(collection(db, "documents"));
      const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDocs(documents);
    };

    fetchDocs();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "documents", id));
    setDocs(docs.filter(doc => doc.id !== id));
  };

  return (
    <>
    <h1>DOC APP</h1>
    <Container className='container' >
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>
      <Button component={Link} to="/new" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        New Document
      </Button>
      <div className='main'>
        {docs.map(doc => (
          <div key={doc.id} className='box'>
            <Typography variant="h6">{doc.title}</Typography>
            <div className='btn'> 
              <IconButton edge="end" aria-label="edit" component={Link} to={`/edit/${doc.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(doc.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </Container>
    </>
  );
}

export default Home;
