import { Button } from 'components/ui/button';
import React from 'react';

const ActionTable = ({action}) => {

  return (
    <>
    <div className="flex gap-2 flex-col items-center w-full">
        {action.map((item) => {
            if(item.visible){
                return (
                    <Button onClick={() => {item.onClick()}} className="block md:hidden w-full text-primary border border-primary bg-white hover:bg-gray-50 h-9" variant="outline">
                        {item.name}
                    </Button>
                )
            }
        })}
    </div>
  </>
)
};

export default ActionTable;