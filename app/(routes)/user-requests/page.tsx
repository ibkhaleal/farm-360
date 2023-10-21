import React from 'react'
import { requests } from '@/data'
import { RequestUserColumn } from './components/columns'
import RequestClient from './components/client'

const MainPage = () => {

    const formattedRequests: RequestUserColumn[] = requests.filter((item) => item.status === "unread").map(req => {
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
                <RequestClient
                    title='Requests'
                    data={formattedRequests} />
            </div>
        </div>
    )
}

export default MainPage