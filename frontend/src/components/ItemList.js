import React from 'react';
import axios from 'axios';

function ItemList({ items, setItems, onItemSelect }) {
  const deleteItem = (id) => {
    axios.delete(`http://18.188.43.192:8000/api/items/${id}/`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button className="update" onClick={() => onItemSelect(item)}>Update</button>
                <button className="delete" onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;