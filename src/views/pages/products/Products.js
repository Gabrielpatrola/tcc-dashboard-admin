/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'

import {
  CCard,
  CCol,
  CRow,
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import { useProducts } from '../../../contexts/ProductsContext'

const Products = () => {
  const [products, setProducts] = useState([])

  /** Contexts */
  const { getProducts } = useProducts()

  useEffect(() => {
    getProducts()
      .then((items) => {
        setProducts(items)
      })
      .catch((error) => console.log(error))
  }, [])

  const getCategory = (value) => {
    switch (value) {
      case '1':
        return 'Comida'
      case '2':
        return 'Bebida'
      case '3':
        return 'Sobremesa'
      case '4':
        return 'Combo'
      default:
        return 'Comida'
    }
  }

  return (
    <>
      <div>
        <AppSidebar />

        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CContainer>
                    <h4 id="traffic" className="card-title mb-2">
                      Lista de produtos
                    </h4>
                    <div className="small text-medium-emphasis mb-2">
                      Aqui estão todos os produtos cadastrados
                    </div>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Categoria</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Valor</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Quantidade</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {products.map((item, index) => {
                          // eslint-disable-next-line react/jsx-key
                          return (
                            <CTableRow key={index}>
                              <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                              <CTableDataCell>{item.name}</CTableDataCell>
                              <CTableDataCell>{getCategory(item.category)}</CTableDataCell>
                              <CTableDataCell>{item.value}</CTableDataCell>
                              <CTableDataCell>{item.quantity}</CTableDataCell>
                            </CTableRow>
                          )
                        })}
                      </CTableBody>
                    </CTable>
                  </CContainer>
                </CCard>
              </CCol>
            </CRow>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default Products
