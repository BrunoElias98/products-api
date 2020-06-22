import React, { memo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import Search from '../search';
import Table from '../table';
import ButtonComponent from '../button';
import FormDialog from '../Dialog';

const useStyles = makeStyles(() => ({
    alignInput: {
        margin: '20px 0'
    },
    alignTextFilter: {
        margin: '10px 10px 10px 0',
        display: 'flex'
    },
    alignButtonFilter: {
        margin: '5px 0 10px 0'
    }
}));

function Main() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState([]);
    const [editProducts, setEditProducts] = useState(false);
    const [addProducts, setAddProducts] = useState(false);
    const initialProducts = { id: null, nome: '', quantidade: null, valor: '' };
    const [currentProduct, setCurrentProduct] = useState(initialProducts);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/api/produtos');

            setProducts(response.data);
            setShowProducts(response.data);
        }

        loadProducts();
    }, []);

    const filterListById = async event => {
        if (event.target.value !== '') {
            const response = await api.get(`/api/produto/${event.target.value}`);
            setShowProducts(response.data); 

            return;
        }

        setShowProducts(products);
    }

    const deleteProduct = async (id, nome, quantidade, valor, oneRow) => {
        const response = await api.delete('/api/produto', { 
            data: {
                id,
                nome, 
                quantidade, 
                valor
            }
        });

        if (response.status === 200 && !oneRow) {
            setShowProducts(showProducts.filter(showProducts => showProducts.id !== id));
        } else {
            setShowProducts(showProducts.id !== id);
        }
    }

    const editProduct = (id, product) => {
        setEditProducts(true);
        setCurrentProduct(product);
    }

    const updateProduct = (newProduct) => {
        setShowProducts(showProducts.map(product => (product.id === currentProduct.id ? newProduct : product)));
    }

    const handleOpenModalAdd = () => {
        setAddProducts(true);
    }

    const addProduct = product => {
        product.id = showProducts.length + 1;
        setShowProducts([...showProducts, product]);
    }

    return (
        <>
            <div className={classes.alignInput}>
                <Search callbacks={filterListById} label='Busque um produto pelo ID' variant='outlined' id='search' />
                <div className={classes.alignTextFilter}>
                    <div className={classes.alignButtonFilter}>
                        <ButtonComponent variant='contained' color='primary' text='Adicionar' onClick={() => handleOpenModalAdd()} />
                        {editProducts ?
                            <FormDialog
                                currentProduct={currentProduct}
                                setEditing={setEditProducts}
                                updateProduct={updateProduct}
                                editModal
                            /> :
                            addProducts ?
                            <FormDialog
                                addProduct={addProduct}
                                setAddProducts={setAddProducts}
                            /> : 
                            null
                        }
                    </div>
                </div>
                {showProducts.length !== 0 ?
                    <Table data={showProducts} callbackDeleteProduct={deleteProduct} callBackEditProduct={editProduct} />
                    : null}
            </div>
        </>
    );
}

export default memo(Main);