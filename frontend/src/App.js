import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import ItemUpdateForm from './components/ItemUpdateForm';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://18.188.43.192:8000/api/items/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setError('Failed to fetch items. Please try again later.');
      });
  };

  const handleItemAdded = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
    setError(null);
  };

  const handleItemUpdated = (updatedItem) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setItemToUpdate(null);
    setError(null);
  };

  return (
    <div className="App">
      <h1>My CRUD App</h1>
      {error && <p className="error">{error}</p>}
      {itemToUpdate ? (
        <ItemUpdateForm 
          item={itemToUpdate} 
          onItemUpdated={handleItemUpdated} 
          onCancel={() => setItemToUpdate(null)}
        />
      ) : (
        <ItemForm onItemAdded={handleItemAdded} />
      )}
      <ItemList 
        items={items} 
        setItems={setItems}
        onItemSelect={setItemToUpdate}
      />
    </div>
  );
}

export default App;