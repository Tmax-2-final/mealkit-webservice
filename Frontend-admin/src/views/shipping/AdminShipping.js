import React, { lazy } from 'react'
// import UserTable from './UserTable.js'
const ShippingTable = lazy(() => import('./ShippingTable.js'))

const AdminShipping = () => {
    return (

        <ShippingTable />
    )
}

export default AdminShipping
