import { Card, CardContent } from 'components/ui/card'
import React from 'react'

const CardComponent = ({children}) => {
  return (
    <>
        <Card className=" border-1 hidden md:block">
            <CardContent className="px-4">
                {children}
            </CardContent>
        </Card>
    </>
  )
}

export default CardComponent
