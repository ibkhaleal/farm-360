import React from 'react'
import NewProductForm from '@/components/forms/new-product-form'

const NewProduct = ({ params }: { params: { requestId: string } }) => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <NewProductForm
                request
                defaultItem={params.requestId} />
        </div>
    )
}

export default NewProduct