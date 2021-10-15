import React, { lazy } from 'react'
const UserDetailTable = lazy(() => import('./UserDetailTable.js'))

const UserDetail = () => {
    return (

        <UserDetailTable />
    )
}

export default UserDetail
