import React, { useState } from 'react';
import axios from 'axios';

function ItemUpdateForm({ item, onItemUpdated, onCancel }) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (name.length < 3) tempErrors.name = "Name must be at least 3 characters long";
    if (description.length < 10) tempErrors.description = "Description must be at least 10 characters long";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.put(`http://18.188.43.192:8000/api/items/${item.id}/`, { name, description })
        .then(response => {
          onItemUpdated(response.data);
        })
        .catch(error => {
          if (error.response && error.response.data) {
            setErrors(error.response.data);
          } else {
            console.error('Error updating item:', error);
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      {errors.description && <p className="error">{errors.description}</p>}
      <button type="submit">Update</button>
      <button type="button" className="delete" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default ItemUpdateForm;