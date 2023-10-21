'use client'

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { RequestColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface RequestTableClient {
    data: RequestColumn[],
    title: string
}

const ProductsClient: React.FC<RequestTableClient> = ({ data, title}) => {

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
                <Heading
                    title={`${title} (${data?.length})`}
                    description=""
                />
            </div>
            <Separator />
            <DataTable filterRow="sender" columns={columns} data={data} />
        </div>
    )
}

export default ProductsClient