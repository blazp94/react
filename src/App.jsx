import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import UserForm from './UserForm';
import UserDetails from './UserDetails';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUserSubmit = async (newUsername) => {
    try {
      setLoading(true);
      setError(null);

      const userResponse = await axios.get(`https://api.github.com/users/${newUsername}`);
      const repositoriesResponse = await axios.get(`https://api.github.com/users/${newUsername}/repos`);

      const user = userResponse.data;
      const repositories = repositoriesResponse.data;

      setUserDetails({
        avatar_url: user.avatar_url,
        name: user.name,
        location: user.location,
        bio: user.bio,
        repositories,
      });

      setLoading(false);
    } catch (error) {
      setUserDetails(null);
      setError('User not found. Please enter a valid GitHub username.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setUserDetails(null);
    setError(null);
  };

  return (
    <Container className="app-container">
      {loading ? (
        <Row className="justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <>
          {userDetails ? (
            <UserDetails user={userDetails} onReset={handleReset} />
          ) : (
            <UserForm onSubmit={handleUserSubmit} error={error} />
          )}
        </>
      )}
    </Container>
  );
}

export default App;