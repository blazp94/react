import React from 'react';
import PropTypes from 'prop-types';
import './UserDetails.css';

function UserDetails({ user, onReset }) {
  return (
    <div className="user-details">
      <img src={user.avatar_url} alt="User Avatar" />
      <h2>{user.name}</h2>
      <p><b>Location:</b> {user.location}</p>
      <p><b>Bio:</b> {user.bio}</p>
      <ul><p><b>Repository</b></p>
        {user.repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

UserDetails.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
    repositories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
  onReset: PropTypes.func.isRequired,
};

export default UserDetails;