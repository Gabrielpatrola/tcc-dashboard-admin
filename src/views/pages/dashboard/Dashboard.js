/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { lazy, useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import { useUsers } from '../../../contexts/UsersContext'

const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
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
            <WidgetsDropdown />

            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardHeader>Usuários</CCardHeader>
                  <CCardBody>
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
                  </CCardBody>
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

export default Dashboard
