/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'

import {
  CCard,
  CForm,
  CCol,
  CRow,
  CFormInput,
  CButton,
  CFormSelect,
  CFormLabel,
  CContainer,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import { useProducts } from '../../../contexts/ProductsContext'

import { useAuth } from '../../../contexts/AuthContext'
import { format } from 'date-fns'

const ProductsCreate = () => {
  /** Refs */
  const nameRef = useRef()
  const valueRef = useRef()
  const quantityRef = useRef()
  const categoryRef = useRef()
  const toastSuccessRef = useRef()
  const toastErrorRef = useRef()

  /** States */
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  /** Contexts */
  const { createProduct } = useProducts()
  const { currentUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      setSuccess(false)
      setError(false)

      createProduct(
        nameRef.current.value,
        valueRef.current.value,
        quantityRef.current.value,
        categoryRef.current.value,
        currentUser.uid,
      )
        .then((docRef) => {
          console.log(docRef.id, nameRef.current.value)
          setSuccess(true)
          setLoading(false)
        })
        .catch((reason) => {
          setError(true)
        })
      setLoading(false)
      setSuccess(false)
      setError(false)
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }

  const toastSuccess = (
    <CToast title="CoreUI for React.js" autohide={true} visible={true} ref={toastSuccessRef}>
      <CToastHeader close>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#98FB98"></rect>
        </svg>
        <strong className="me-auto">Sucesso</strong>
        <small>{format(new Date(), 'dd-mm-yyyy hh:mm')}</small>
      </CToastHeader>
      <CToastBody>Produto criado com sucesso!</CToastBody>
    </CToast>
  )

  const toastError = (
    <CToast title="CoreUI for React.js" autohide={true} visible={true} ref={toastErrorRef}>
      <CToastHeader close>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#FF6347"></rect>
        </svg>
        <strong className="me-auto">Erro</strong>
        <small>{format(new Date(), 'dd-mm-yyyy hh:mm')}</small>
      </CToastHeader>
      <CToastBody>Desculpe ocorreu um erro ao tentar adicionar o produto!</CToastBody>
    </CToast>
  )
  return (
    <>
      <div>
        <AppSidebar />

        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {error && <CToaster ref={toastErrorRef} push={toastError} placement="top-end" />}
          {success && <CToaster ref={toastSuccessRef} push={toastSuccess} placement="top-end" />}
          <div className="body flex-grow-1 px-3">
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CContainer>
                    <h4 id="traffic" className="card-title mb-2">
                      Criação de produtos
                    </h4>
                    <div className="small text-medium-emphasis mb-2">
                      Preencha o formulário abaixo para criar um novo produto
                    </div>
                    <CForm className="row g-3" onSubmit={handleSubmit}>
                      <CCol md={6}>
                        <CFormLabel>Nome</CFormLabel>
                        <CFormInput type="name" ref={nameRef} />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel>Valor</CFormLabel>
                        <CFormInput
                          type="number"
                          min="0.00"
                          max="10000.00"
                          step="0.01"
                          ref={valueRef}
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel>Categoria</CFormLabel>
                        <CFormSelect ref={categoryRef}>
                          <option>Escolha uma opção</option>
                          <option value="1">Comida</option>
                          <option value="2">Bebida</option>
                          <option value="3">Sobremesa</option>
                          <option value="4">Combo</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel>Quantidade</CFormLabel>
                        <CFormInput ref={quantityRef} />
                      </CCol>
                      <CCol xs={12}>
                        <CButton type="submit" className="mb-5">
                          Cadastrar
                        </CButton>
                      </CCol>
                    </CForm>
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

export default ProductsCreate
