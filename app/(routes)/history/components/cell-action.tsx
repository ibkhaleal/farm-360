'use client'

import { useRouter } from "next/navigation"
import { ExternalLink, MoreHorizontal, Save, View } from "lucide-react"
import axios from "axios"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { RequestColumn } from "./columns"

interface CellActionProps {
    data: RequestColumn
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
                    {
                        data?.isIncoming ?
                            (<DropdownMenuItem onClick={() => router.push(`/requests/${data.id}/save`)}>
                                <Save className="mr-2 h-4 w-4" />
                                Save
                            </DropdownMenuItem>)
                            :
                            (<DropdownMenuItem onClick={() => router.push(`/requests/${data.id}/withdraw`)}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Withdraw
                            </DropdownMenuItem>)
                    }


                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
} 