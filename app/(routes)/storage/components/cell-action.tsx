'use client'

import { useRouter } from "next/navigation"
import { ExternalLink, MoreHorizontal, Plus, View } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserProduct } from "@/types"

interface CellActionProps {
    data: UserProduct
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
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/storage/${data.itemId}/view`)}>
                        <View className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/storage/${data.itemId}/save`)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Save
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/storage/${data.itemId}/withdraw`)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Withdraw
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
} 