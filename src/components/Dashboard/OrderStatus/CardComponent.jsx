import { Card, CardContent } from 'components/ui/card'
import React from 'react'

const CardComponent = ({children, className}) => {
  return (
    <>
        <Card className={` ${className}`}>
            <CardContent className="pt-4 px-0">
                {children}
            </CardContent>
        </Card>
    </>
  )
}

export default CardComponent
