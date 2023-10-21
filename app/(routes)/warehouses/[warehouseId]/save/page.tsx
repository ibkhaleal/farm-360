import React from 'react'
import NewProductForm from '@/components/forms/new-product-form'

const NewProduct = ({ params }: { params: { warehouseId: string } }) => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <NewProductForm
                isWarehouse
                defaultItem={params.warehouseId} />
        </div>
    )
}

export default NewProduct