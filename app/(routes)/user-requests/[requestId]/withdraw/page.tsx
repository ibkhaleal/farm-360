import WithdrawProductForm from '@/components/forms/withdraw-product-form'

const WithdrawProduct = ({ params }: { params: { requestId: string } }) => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <WithdrawProductForm
                request
                defaultItem={params?.requestId} />
        </div>
    )
}

export default WithdrawProduct