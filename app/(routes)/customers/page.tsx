import React from 'react'
import UsersClient from './components/client'

const MainPage = () => {


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="w-full max-w-7xl mx-auto ">
                <UsersClient
                title='Customers'
                />
            </div>
        </div>
    )
}

export default MainPage