'use client'

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { UserProduct } from "@/types"
import { useData } from "@/components/providers/content-provider"

interface UsersTableClient {
    data?: UserProduct[]
    title: string
    enableDescription?: boolean
    enableAddButton?: boolean
}

const ProductsClient: React.FC<UsersTableClient> = ({ data, title, enableDescription = true, enableAddButton = true }) => {

    const router = useRouter();
    const { userProducts } = useData()

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
                <Heading
                    title={`${title} (${data?.length || userProducts?.length})`}
                    description={enableDescription ? "Manage Products of your storage" : ""}
                />
                {
                    enableAddButton && <Button
                        variant="primary"
                        onClick={() => router.push(`/storage/new`)} >
                        <Plus className="mr-2 h-4" />
                        Add New
                    </Button>
                }
            </div>
            <Separator />
            <DataTable filterRow="name" columns={columns} data={data || userProducts} />
        </div>
    )
}

export default ProductsClient