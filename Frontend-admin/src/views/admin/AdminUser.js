import React, { lazy } from 'react'
// import UserTable from './UserTable.js'
const UserTable = lazy(() => import('./UserTable.js'))

const AdminUser = () => {
  return (
    
      <UserTable />
  )
}

export default AdminUser
