import React from 'react'
import ProductsClient from './components/client'
import { requests, users, warehouseProducts } from '@/data'
import { RequestColumn } from './components/columns'

const MainPage = () => {

    const formattedRequests: RequestColumn[] = requests.filter((item) => item.status === "unread" && item.type === 1).map(req => {
        return {
            id: req?.id,
            userName: req?.userName,
            userMobile: req.userMobile,
            itemName: req.itemName,
            itemWeight: req.weight!,
            isIncoming: req.isIncoming,
            createdAt: req?.dateAdded || ""
        }
    })

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="w-full max-w-7xl mx-auto ">
                <ProductsClient
                    title='Requests'
                    data={formattedRequests} />
            </div>
        </div>
    )
}

export default MainPage