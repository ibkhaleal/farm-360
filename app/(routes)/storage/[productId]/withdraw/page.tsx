import WithdrawProductRequestForm from "@/components/forms/withdraw-request-form"

const WithdrawProduct = ({ params }: { params: { productId: string } }) => {

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <WithdrawProductRequestForm defaultItem={params?.productId} />
        </div>
    )
}

export default WithdrawProduct