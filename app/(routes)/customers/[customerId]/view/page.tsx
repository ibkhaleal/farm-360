"use client"
 import React from 'react'
import ProductsClient from '../../components/client'
import { Separator } from '@/components/ui/separator'
import CustomerCard from '@/components/customer-card'
import { useData } from '@/components/providers/content-provider'
import { WarehouseProduct } from '@/types'

const ViewUserPage = ({ params }: { params: { customerId: string } }) => {

    const { warehouseProducts } = useData();

     // Create a map to store distinct users based on their IDs
     const distinctCustomersMap: Record<string, WarehouseProduct> = {};

     // Iterate through the userProducts array and add users to the map
     warehouseProducts.forEach((userProduct) => {
         distinctCustomersMap[userProduct.ownerId] = userProduct;
     });
 
     // Get an array of distinct users from the map
     const distinctCustomers: WarehouseProduct[] = Object.values(distinctCustomersMap);
 

    const activeUser = distinctCustomers.find(item => item.id === params?.customerId)
    const activeUserProducts = warehouseProducts.filter((prod) => prod.ownerId === activeUser?.ownerId);
    const activeUserData = {
        id: activeUser?.id!,
        name: activeUser?.ownerName!,
        mobile: activeUser?.ownerMobile!,
        image: activeUser?.ownerImage!,
        address: activeUser?.ownerAddress!,
        allProductsCount: activeUserProducts.length,
        allProductsWeight: activeUserProducts.reduce((sum, prod) => sum + Number(prod.weight), 0),
        createdAt: activeUserProducts[0]?.dateAdded || ""
    }
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-5">
                <CustomerCard data={activeUserData} />
                <Separator />
                <ProductsClient
                    title='Other Products'
                    enableAddButton={false}
                    enableDescription={false} />
            </div>
        </div>
    )
}

export default ViewUserPage