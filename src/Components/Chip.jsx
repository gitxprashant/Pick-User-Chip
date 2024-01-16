import React, { useState } from 'react';
import './Chip.css';

const userList = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com' },
  { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
  { id: 6, name: 'Eva White', email: 'eva.white@example.com' },
  { id: 7, name: 'Mike Wilson', email: 'mike.wilson@example.com' },
  { id: 8, name: 'Sara Miller', email: 'sara.miller@example.com' },
];

const Chip = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowUserList(true);
  };

  const handleUserClick = (user) => {
    const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);
    if (isSelected) {
      handleChipRemove(user.id);
    } else {
      setSelectedUsers([...selectedUsers, user]);
      setInputValue('');
    }
  };

  const handleChipRemove = (userId) => {
    const updatedUsers = selectedUsers.filter((user) => user.id !== userId);
    setSelectedUsers(updatedUsers);
  };

  const handleBackspace = () => {
    if (inputValue === '' && selectedUsers.length > 0) {
      const lastSelectedUser = selectedUsers[selectedUsers.length - 1];
      handleChipRemove(lastSelectedUser.id);
    }
  };

  return (
    <div className="chip-input">
      <h1 className="heading">Pick User</h1>
      <div className="chips">
      {selectedUsers.map((user) => (
          <div key={user.id} className="chip">
            {user.name} <span onClick={() => handleChipRemove(user.id)}>X</span>
          </div>
        ))}
      </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Backspace' && handleBackspace()}
          placeholder={'Type to search...'}
          onClick={() => setShowUserList(true)}
        />
      {showUserList && (
        <ul className="user-list">
          {userList
            .filter((user) => !selectedUsers.map((u) => u.id).includes(user.id))
            .filter((user) => user.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user)}>
                {user.name} - {user.email}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Chip;
