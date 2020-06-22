import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonComponent from '../button';
import TextField from '../inputTextField';
import api from '../../services/api';

export default function EditModal({ currentProduct, setEditing, updateProduct }) {
  const [product, setProduct] = useState(currentProduct);

  const handleChange = e => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const { nome, quantidade, valor } = product;
    setEditing(false)

    const response = await api.put('/api/produto', {
      nome, quantidade, valor
    });

    if (response.status === 200)
      updateProduct(product);
  }

  useEffect(() => {
    setProduct(currentProduct)
  }, [currentProduct]);

  const handleClose = () => {
    setEditing(false)
  };

  return (
    <form>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Produtos</DialogTitle>
        <DialogContent>
          <TextField
            type='text'
            margin="dense"
            name="nome"
            label="Nome"
            defaultValue={currentProduct.nome}
            fullWidth
            onChange={handleChange}
          />
          <div style={{ display: 'flex' }}>
            <div style={{ paddingRight: '5px' }}>
              <TextField
                margin="dense"
                name="quantidade"
                label="Quantidade"
                defaultValue={currentProduct.quantidade}
                onChange={handleChange}
              />
            </div>
            <TextField
              margin="dense"
              name="valor"
              label="Valor"
              defaultValue={currentProduct.valor}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonComponent type='submit' onClick={() => setEditing(false)} color="primary" text='Cancelar' />
          <ButtonComponent type="submit" onClick={handleSubmit} color="primary" text='Salvar' />
        </DialogActions>
      </Dialog>
    </form>
  )
}