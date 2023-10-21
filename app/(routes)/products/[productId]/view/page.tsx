import React from 'react'
import ProductsClient from '../../components/client'
import { warehouseProducts } from '@/data'
import { ProductsColumnForWarehouse } from '../../components/columns'
import { Separator } from '@/components/ui/separator'
import ProductCard from '@/components/product-card'

const ViewProductPage = ({ params }: { params: { productId: string } }) => {

    const formattedProducts: ProductsColumnForWarehouse[] = warehouseProducts.filter(item => item.id !== params?.productId).map(prod => {
        return {
            id: prod?.id,
            name: prod?.name,
            owner: prod.ownerName,
            ownerMobile: prod.ownerMobile,
            weight: prod.weight,
            createdAt: prod?.dateAdded || ""
    }
    })

    const activeProduct = warehouseProducts.find(item => item.id === params?.productId )

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-5">
                <ProductCard data={activeProduct} />
                <Separator />
                <ProductsClient 
                title='Other Products'  
                enableAddButton={false}
                enableDescription={false}
                data={formattedProducts}/>
            </div>
        </div>
    )
}

export default ViewProductPage