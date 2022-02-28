import React, { useState, useRef } from 'react'

import {
  CCard,
  CForm,
  CCol,
  CRow,
  CFormInput,
  CButton,
  CFormLabel,
  CContainer,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'

import { format } from 'date-fns'
import { useUsers } from '../../../contexts/UsersContext'

const ProductsCreate = () => {
  /** Refs */
  const emailRef = useRef()
  const passwordRef = useRef()
  const toastSuccessUserRef = useRef()
  const toastErrorRef = useRef()

  /** States */
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  /** Contexts */
  const { register } = useUsers()

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setSuccess(false)
    setError(false)

    try {
      register(emailRef.current.value, passwordRef.current.value)
        .then((docRef) => {
          console.log(docRef)
          setSuccess(true)
        })
        .catch((reason) => {
          console.log(reason)
          setSuccess(false)
          setError(true)
        })
    } catch (error) {
      setSuccess(false)
      console.log(error)
    }
    setSuccess(false)
  }

  const toastError = (
    <CToast title="CoreUI for React.js" autohide={true} visible={true} ref={toastErrorRef}>
      <CToastHeader>
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
      <CToastBody>Desculpe ocorreu um erro ao tentar adicionar o usuário!</CToastBody>
    </CToast>
  )
  return (
    <>
      <div>
        <AppSidebar />

        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {error !== false && (
            <CToaster ref={toastErrorRef} push={toastError} placement="top-end" />
          )}
          {success !== false && (
            <CToaster placement="top-end">
              <CToast
                title="CoreUI for React.js"
                autohide={true}
                visible={true}
                ref={toastSuccessUserRef}
              >
                <CToastHeader>
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
                <CToastBody>Usuário cadastrado com sucesso!</CToastBody>
              </CToast>
            </CToaster>
          )}
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
                        <CFormInput type="email" ref={emailRef} required />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel>Senha</CFormLabel>
                        <CFormInput type="password" ref={passwordRef} required />
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
