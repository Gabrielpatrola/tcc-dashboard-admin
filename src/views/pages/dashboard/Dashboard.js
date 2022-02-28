/* eslint-disable no-unused-vars */
import React, { lazy, useState, useRef } from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import { useProducts } from '../../../contexts/ProductsContext'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { useAuth } from '../../../contexts/AuthContext'

const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  const nameRef = useRef()
  const valueRef = useRef()
  const quantityRef = useRef()
  const categoryRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { createGroceryList } = useProducts()
  const { currentUser } = useAuth()

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  console.log(currentUser.uid)

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

      //history.push('/dashboard')
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
                  <CCardHeader>Usuários</CCardHeader>
                  <CCardBody>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                      <CTableHead color="light">
                        <CTableRow>
                          <CTableHeaderCell className="text-center">
                            <CIcon icon={cilPeople} />
                          </CTableHeaderCell>
                          <CTableHeaderCell>User</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                          <CTableHeaderCell>Usage</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">
                            Payment Method
                          </CTableHeaderCell>
                          <CTableHeaderCell>Activity</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {tableExample.map((item, index) => (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell className="text-center">
                              <CAvatar
                                size="md"
                                src={item.avatar.src}
                                status={item.avatar.status}
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{item.user.name}</div>
                              <div className="small text-medium-emphasis">
                                <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                {item.user.registered}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="clearfix">
                                <div className="float-start">
                                  <strong>{item.usage.value}%</strong>
                                </div>
                                <div className="float-end">
                                  <small className="text-medium-emphasis">
                                    {item.usage.period}
                                  </small>
                                </div>
                              </div>
                              <CProgress thin color={item.usage.color} value={item.usage.value} />
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <CIcon size="xl" icon={item.payment.icon} />
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="small text-medium-emphasis">Last login</div>
                              <strong>{item.activity}</strong>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
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

export default Dashboard
