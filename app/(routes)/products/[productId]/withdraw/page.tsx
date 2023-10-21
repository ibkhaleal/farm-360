import WithdrawProductForm from '@/components/forms/withdraw-product-form'

const WithdrawProduct = ({ params }: { params: { productId: string } }) => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <WithdrawProductForm defaultItem={params?.productId} />
        </div>
    )
}

export default WithdrawProduct