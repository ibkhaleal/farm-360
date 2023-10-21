"use client"
import React from 'react'
import ProductsClient from './components/client'
import { requests } from '@/data'
import { RequestColumn } from './components/columns'
import { RequestUserColumn } from '../user-requests/components/columns'
import { useData } from '@/components/providers/content-provider'
import RequestClient from '../user-requests/components/client'

const MainPage = () => {

    const { user } = useData();

    const formattedRequests: RequestColumn[] = user?.utype === "1" ? [] : requests.filter((item) => item.status === "read" && item.type === 1).map(req => {
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

    const formattedUserRequests: RequestUserColumn[] = user?.utype !== "1" ? [] : requests.filter((item) => item.status === "read").map(req => {
        return {
            id: req?.id,
            orgName: req?.orgName,
            orgMobile: req.userMobile,
            itemName: req.itemName,
            type: req?.type,
            itemWeight: req.weight!,
            duration: req.duration,
            isIncoming: req.isIncoming,
            createdAt: req?.dateAdded || ""
        }
    })


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="w-full max-w-7xl mx-auto ">
                {user?.utype !== "1" && <ProductsClient
                    title='History'
                    data={formattedRequests}
                />}
                {user?.utype === "1" && <RequestClient
                    title='History'
                    data={formattedUserRequests} />}
            </div>
        </div>
    )
}

export default MainPage