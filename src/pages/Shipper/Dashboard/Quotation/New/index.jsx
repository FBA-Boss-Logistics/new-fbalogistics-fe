import React from 'react'
import { Button } from "@/components/ui/button"
import {  MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PackageOpen } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import EmptyIcon from 'assets/svg/EmptyIcon.svg'

const Quotation = () => {
    const [isLoading, setIsLoading] = useState(true)
      const shipments = [
        {
          id: "SHP-1001",
          destination: "Jakarta, Indonesia",
          customer: "PT Maju Bersama",
          date: "2023-04-10",
          status: "delivered",
        },
        {
          id: "SHP-1002",
          destination: "Surabaya, Indonesia",
          customer: "CV Sukses Mandiri",
          date: "2023-04-11",
          status: "in-transit",
        },
        {
          id: "SHP-1003",
          destination: "Bandung, Indonesia",
          customer: "PT Teknologi Maju",
          date: "2023-04-12",
          status: "processing",
        },
        {
          id: "SHP-1004",
          destination: "Medan, Indonesia",
          customer: "CV Abadi Jaya",
          date: "2023-04-13",
          status: "delivered",
        },
        {
          id: "SHP-1005",
          destination: "Makassar, Indonesia",
          customer: "PT Samudera Biru",
          date: "2023-04-14",
          status: "in-transit",
        },
      ]
    

  useEffect(() => {
    console.log(shipments.length )
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
       {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Loader2 className="h-10 w-10 text-slate-400 animate-spin" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">Loading orders...</h3>
            <p className="text-sm text-slate-500 text-center mb-6 max-w-md">
              Please wait while we fetch your order data.
            </p>
          </div>
        ) :shipments.length > 0?(
      <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[120px]">Biding Ends In</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Shipment Date</TableHead>
              <TableHead>Pickup Location</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-none">
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">{shipment.id}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.customer}</TableCell>
                <TableCell>{shipment.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuItem>Print label</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    ):(
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <img src={EmptyIcon} alt="EMPTY ICON" />
              <PackageOpen className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">You have no order yet</h3>
            <p className="text-sm text-slate-500 text-center mb-6 max-w-md">
            Orders will appear here once they are placed. Check back later for updates.
            </p>
          </div>
    )}
    </div>
  )
}

export default Quotation
