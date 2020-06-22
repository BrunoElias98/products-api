import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonComponent from '../button';
import TextField from '../inputTextField';
import api from '../../services/api';

export default function AddModal({ addProduct, setAddProducts }) {

  const initProduct = { id: null, nome: '', quantidade: null, valor: '' };
  const [product, setProduct] = useState(initProduct);

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const { nome, quantidade, valor } = product;
    setAddProducts(false);

    const response = await api.post('/api/produto', {
      nome, quantidade, valor
    });

    if (response.status === 200)
      addProduct(product);
  }

  const handleClose = () => {
    setAddProducts(false);
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
            fullWidth
            onChange={handleChange}
            autoFocus
          />
          <div style={{ display: 'flex' }}>
            <div style={{ paddingRight: '5px' }}>
              <TextField
                margin="dense"
                name="quantidade"
                label="Quantidade"
                onChange={handleChange}
              />
            </div>
            <TextField
              margin="dense"
              name="valor"
              label="Valor"
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonComponent type='submit' onClick={() => setAddProducts(false)} color="primary" text='Cancelar' />
          <ButtonComponent type="submit" onClick={handleSubmit} color="primary" text='Salvar' />
        </DialogActions>
      </Dialog>
    </form>
  )
}