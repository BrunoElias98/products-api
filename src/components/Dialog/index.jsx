import React from 'react';
import EditModal from './editModal';
import AddModal from './addModal';

export default function FormDialog({ currentProduct, setEditing, updateProduct, editModal, addProduct, setAddProducts }) {
  
  const getCurrentEditModal = () => {
    return (
      <EditModal 
        currentProduct={currentProduct} 
        setEditing={setEditing} 
        updateProduct={updateProduct}
      />
    );
  }
  
  const getCurrentAddModal = () => {
    return (
      <AddModal 
        addProduct={addProduct}
        setAddProducts={setAddProducts}
      />
    );
  }

  return (
    editModal ? getCurrentEditModal() : getCurrentAddModal()
  );
}