import React from 'react'
import NewWarehouseRequestForm from '@/components/forms/warehouse-request-form'

const NewProduct = ({ params }: { params: { productId: string } }) => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <NewWarehouseRequestForm defaultItem={params.productId} />
        </div>
    )
}

export default NewProduct