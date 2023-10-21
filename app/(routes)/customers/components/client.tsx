'use client'

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { UsersColumnForWarehouse, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { WarehouseProduct } from "@/types"
import { useData } from "@/components/providers/content-provider"

interface UsersTableClient {
    title: string
    enableDescription?: boolean
    enableAddButton?: boolean
}

const UsersClient: React.FC<UsersTableClient> = ({ title, enableDescription = true, enableAddButton = true }) => {

    
    const { warehouseProducts } = useData();
    const router = useRouter();

    // Create a map to store distinct users based on their IDs
    const distinctCustomersMap: Record<string, WarehouseProduct> = {};

    // Iterate through the userProducts array and add users to the map
    warehouseProducts.forEach((userProduct) => {
        distinctCustomersMap[userProduct.ownerId] = userProduct;
    });

    // Get an array of distinct users from the map
    const distinctCustomers: WarehouseProduct[] = Object.values(distinctCustomersMap);


    
    const formattedUsers: UsersColumnForWarehouse[] = distinctCustomers.map(user => {
        const userProducts = warehouseProducts.filter((prod) => prod.ownerId === user.ownerId);
        
        return {
            id: user?.id,
            name: user?.ownerName,
            mobile: user?.ownerMobile,
            allProductsCount: userProducts.length,
            allProductsWeight: userProducts.reduce((sum, prod) => sum + Number(prod.weight), 0),
            createdAt: userProducts[0]?.dateAdded || ""
    }
    })

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
                <Heading
                    title={`${title} (${formattedUsers?.length})`}
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
            <DataTable filterRow="name" columns={columns} data={formattedUsers} />
        </div>
    )
}

export default UsersClient