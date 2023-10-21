import WithdrawProductForm from '@/components/forms/withdraw-product-form'

const WithdrawProduct = ({ params }: { params: { customerId: string } }) => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <WithdrawProductForm defaultItem={params?.customerId} customer/>
        </div>
    )
}

export default WithdrawProduct