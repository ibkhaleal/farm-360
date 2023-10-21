import React from 'react'
import ProductsClient from './components/client'

const MainPage = () => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="w-full max-w-7xl mx-auto ">
                <ProductsClient
                    title='Products'/>
            </div>
        </div>
    )
}

export default MainPage