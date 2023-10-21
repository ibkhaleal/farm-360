'use client'

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { RequestUserColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface RequestTableClient {
    data: RequestUserColumn[],
    title: string
    enableDescription?: boolean
    enableAddButton?: boolean
}

const RequestClient: React.FC<RequestTableClient> = ({ data, title, enableDescription = true, enableAddButton = true }) => {

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
                <Heading
                    title={`${title} (${data?.length})`}
                    description={enableDescription ? "Manage your active requests" : ""}
                />
            </div>
            <Separator />
            <DataTable filterRow="sender" columns={columns} data={data} />
        </div>
    )
}

export default RequestClient