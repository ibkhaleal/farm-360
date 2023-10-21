import React from 'react'
import NewProductForm from '@/components/forms/new-product-form'

const NewProduct = ({ params }: { params: { customerId: string } }) => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <NewProductForm defaultItem={params.customerId} />
        </div>
    )
}

export default NewProduct