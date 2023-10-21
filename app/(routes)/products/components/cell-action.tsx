'use client'

import { useRouter } from "next/navigation"
import { ExternalLink, MoreHorizontal, View } from "lucide-react"
import axios from "axios"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ProductsColumnForWarehouse } from "./columns"

interface CellActionProps {
    data: ProductsColumnForWarehouse
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const router = useRouter();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="ا-8 "
                    >
                        <span className="sr-only">open Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/products/${data.id}/view`)}>
                        <View className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/products/${data.id}/withdraw`)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Withdraw
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
} 