/* eslint-disable no-unused-vars */
import React, { lazy, useState, useRef } from 'react'

import {
  CCard,
  CForm,
  CCol,
  CRow,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import { useProducts } from '../../../contexts/ProductsContext'

import { useAuth } from '../../../contexts/AuthContext'

const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))

const Products = () => {
  const nameRef = useRef()
  const valueRef = useRef()
  const quantityRef = useRef()
  const categoryRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { createGroceryList } = useProducts()
  const { currentUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      console.log('aq', nameRef.current.value, valueRef.current.value)

      createGroceryList(
        nameRef.current.value,
        valueRef.current.value,
        quantityRef.current.value,
        categoryRef.current.value,
        currentUser.uid,
      )
        .then((docRef) => {
          console.log(docRef.id, nameRef.current.value)
        })
        .catch((reason) => console.log(reason))

      //history.push('/Products')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <WidgetsDropdown />

            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="name"
                        autoComplete="name"
                        ref={nameRef}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="text" ref={valueRef} required placeholder="value" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="text" ref={quantityRef} required placeholder="quantity" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormSelect ref={categoryRef}>
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </CFormSelect>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
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
