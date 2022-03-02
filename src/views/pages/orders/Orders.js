/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

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
  CCardHeader,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import { useOrders } from '../../../contexts/OrdersContext'

import getBrl from '../../../utils/getBrl'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)

  /** Contexts */
  const { getOrders } = useOrders()

  useEffect(() => {
    getOrders()
      .then((items) => {
        console.log(items)
        setOrders(items)

        const teste = orders.map((item) => {
          return item.amount
        })

        setTotal(teste.reduce((partialSum, a) => partialSum + a, 0))
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
                  <CCardHeader> Lista de Pedidos</CCardHeader>
                  <CContainer>
                    <div className="small text-medium-emphasis mb-2">
                      Aqui estão todos os pedidos realizados!
                    </div>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Usuário</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Valor</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {orders.map((item, index) => {
                          return (
                            <CTableRow key={index}>
                              <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                              <CTableDataCell>{item.email}</CTableDataCell>
                              <CTableDataCell>{getBrl(item.amount)}</CTableDataCell>
                              <CTableDataCell>
                                {item.status === 'Success' ? 'Finalizado' : 'Em andamento'}
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })}
                      </CTableBody>
                    </CTable>
                    Total em vendas: {getBrl(total)}
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

export default Orders
