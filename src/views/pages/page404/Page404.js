import React from 'react'
import { CButton, CCol, CContainer, CInputGroup, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'

const Page404 = () => {
  const history = useHistory()

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! Você parece perdido!</h4>
              <p className="text-medium-emphasis float-start">
                A página que você procura não existe!
              </p>
            </div>
            <CInputGroup className="input-prepend">
              <CButton color="info" onClick={() => history.push('/dashboard')}>
                Volte para o dashboard
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
