import React from 'react'

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function AnnouncementShipperDetail() {
  return (
    <>
          <div className="container mx-auto">
      <div className="mb-8">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to announcements
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <article className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Was ist SEO? Google Suchmaschinenoptimierung in 2022
            </h1>

            <div className="flex items-center text-sm text-yellow-500">
              <span>Nov 15, 2024</span>
              <span className="mx-2">•</span>
              <span>2 min read</span>
            </div>

            <div className="prose max-w-none">
              <p>
                Dear FBA Boss Academy students, Hope you are all doing well. Here is the latest news regarding the
                situation of Amazon warehouse over capacity in the USA: The following warehouses have had a serious
                explosion of overcapacity, there will be delays in getting delivery appointments : ABQ2 PSC2 MIT2 GEU3
                IUSP XLX7 ABE8 AVP1 CLT2 ORF2
              </p>

              <p>
                The impact of overcapacity, rejection on appointments, cancellation on appointments, and limited release
                of appointments are increasing at the following warehouses: SBD1 LGB6 OVR2 GYR3 MDW2 CLT2 ABE8 AVP1 TEB9
                FWA4 WBW2 LBE1 BDL6 RDU4 HIA1 PHL5 TTN2 HIA1 The current storage situation of ONT8 LGB8 and other
                warehouses on releasing appointments is also not ideal With the arrival of the peak stocking period for
                the big promotion, Amazon warehouses have also issued notices about slow stocking operations in
                November.
              </p>

              <p>
                It is foreseeable that Amazon warehouses will likely experience inventory shortages one after another.
                During this period, our company will continue to rush making appointments, buying appointments, and
                arrange for early delivery of goods. We also suggest that hot selling products that are about to be
                shipped can be divided into several channels and delivery methods, such as arranging some fast ships,
                some slow ships, some deliver by ups/FedEx, some deliver by truck, etc., to avoid stockouts! PS: If
                there is an imminent shortage of goods, please contact us in advance to confirm the corresponding
                solution for the order. Please note and arrange your shipments accordingly. Any needs just contact us.
              </p>

              <p>Angel</p>
            </div>
          </article>
        </div>

        <div className="md:col-span-1">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 flex flex-col items-center text-center">
              {/* <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Angel Zhuang" />
                <AvatarFallback>AZ</AvatarFallback>
              </Avatar> */}
              <h3 className="text-lg font-medium">Angel Zhuang</h3>
              <p className="text-sm text-gray-500 mt-1">
                Contributing Writer
                <br />
                at <span className="font-medium">FBA BOSS</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  )
}

