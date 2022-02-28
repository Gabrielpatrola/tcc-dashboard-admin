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
import { useUsers } from '../../../contexts/UsersContext'

const Users = () => {
  const [users, setUsers] = useState([])

  /** Contexts */
  const { getUsers } = useUsers()

  useEffect(() => {
    getUsers()
      .then((items) => {
        setUsers(items)
      })
      .catch((error) => console.log(error))
  }, [])

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
                      Lista de usuários
                    </h4>
                    <div className="small text-medium-emphasis mb-2">
                      Aqui estão todos os usuários cadastrados!
                    </div>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
                          <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {users.map((item, index) => {
                          return (
                            <CTableRow key={index}>
                              <CTableHeaderCell scope="row">{item.uid}</CTableHeaderCell>
                              <CTableDataCell>{item.name ? item.name : 'Sem Nome'}</CTableDataCell>
                              <CTableDataCell>{item.provider}</CTableDataCell>
                              <CTableDataCell>{item.email}</CTableDataCell>
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

export default Users
