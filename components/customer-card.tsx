import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UsersColumnForWarehouse } from '@/app/(routes)/customers/components/columns'

type ExtendedUsersColumnForWarehouse = UsersColumnForWarehouse & {
    image: string,
    address: string
}

const CustomerCard = ({ data }: { data?: ExtendedUsersColumnForWarehouse }) => {

    if (!data) {
        <div>user not found</div>
    }
    return (
        <div className='flex flex-col gap-5'>
            <Avatar className='h-20 w-20 relative z-20'>
                <AvatarImage
                    src={data?.image || "https://r.search.yahoo.com/_ylt=Awr4_hTT7xtlKjYe5GyJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzJkNzBmZTI1NDA4M2Q1ZjJmMGY5YTY4YTI5YjhlNjRmBGdwb3MDNjQEaXQDYmluZw--/RV=2/RE=1696358484/RO=11/RU=http%3a%2f%2fwww.clker.com%2fclipart-male-avatar.html/RK=2/RS=Sbfovzla4lQ1.8NabRfF3nHnSNM-"}
                    className='bg-gray-200'
                />
                <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
                <div className="flex flex-col">
                    <p className='font-semibold text-xl'>{data?.name}</p>
                    <p className='text-sm'>{data?.mobile}</p>
                </div>
            </div>

            <div className="flex gap-x-2 items-end">
                <h1 className='text-lg font-bold'>No. products</h1>
                <span className='text-base font-semibold py-1'>({data?.allProductsCount})</span>
            </div>

            <div className="flex gap-x-2 items-end">
                <h1 className='text-lg font-bold'>All products</h1>
                <span className='text-base font-semibold py-1'>({data?.allProductsWeight}kg)</span>
            </div>



            <div className="flex gap-x-2 items-end">
                <h1 className='text-lg font-bold'>Address:</h1>
                <span className='text-sm font-semibold py-1 max-w-lg'>{data?.address}</span>
            </div>
        </div>
    )
}

export default CustomerCard