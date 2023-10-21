'use client'

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { ProductsColumnForWarehouse, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface UsersTableClient {
    data: ProductsColumnForWarehouse[],
    title: string
    enableDescription?: boolean
    enableAddButton?: boolean
}

const ProductsClient: React.FC<UsersTableClient> = ({ data, title, enableDescription = true, enableAddButton = true }) => {

    const router = useRouter();

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
                <Heading
                    title={`${title} (${data?.length})`}
                    description={enableDescription ? "Manage Products of your store" : ""}
                />
                {
                    enableAddButton && <Button
                        variant="primary"
                        onClick={() => router.push(`/products/new`)} >
                        <Plus className="mr-2 h-4" />
                        Add New
                    </Button>
                }
            </div>
            <Separator />
            <DataTable filterRow="name" columns={columns} data={data} />
        </div>
    )
}

export default ProductsClient