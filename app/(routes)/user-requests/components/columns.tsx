"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type RequestUserColumn = {
  id: string
  orgName: string
  orgMobile: string
  itemName: string
  type: number
  itemWeight: number | null
  duration: string | null
  isIncoming: boolean
  createdAt: string
}
// itemDuration?: string

export const columns: ColumnDef<RequestUserColumn>[] = [
  {
    accessorKey: "orgName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Warehouse
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "orgMobile",
    header: "Mobile",
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("type") === 1 ? "Product" : "Tool"}</div>
    },
  },
  {
    accessorKey: "itemWeight",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Weight
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      if(row.getValue("itemWeight") === null){
        return null
      }
      return <div className="font-medium">{row.getValue("itemWeight")} Kg</div>
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      if(row.getValue("duration") === null){
        return null
      }
      return <div className="font-medium">{row.getValue("duration")}</div>
    },
  },
  {
    accessorKey: "isIncoming",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">
        {
          row.getValue("isIncoming") 
          ? <Button size="sm" variant="ghost" className="border py-2 rounded-full text-sm border-teal-500 text-teal-500">Savings</Button>
          : <Button size="sm" variant="ghost" className="border py-2 rounded-full text-sm border-rose-500 text-rose-500">Withdrawal</Button>
          
        }
        </div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
 
]
