import { useState } from 'react';
import { Card } from 'components/ui/card';
import calculatorIcon from 'assets/svg/calculatorResult.svg';
import { Button } from 'components/ui/button';

export default function Results({ result, grossWeight, cubicMeter, submit, calculate, clearResult, handleClearResult }) {
    return (
        <>
            <Card className='overflow-hidden p-6 bg-[#213E7B] text-white'>
                <div className='flex items-center gap-4 pt-[6px] pb-2'>
                    <img src={calculatorIcon} alt="calculator" className='w-8 h-8' />
                    <h1 className='text-lg font-semibold text-white'>Results</h1>
                </div>
                <Card className='overflow-hidden p-6 bg-[#2A4680] text-white mt-6 border border-[#FFFFFF0D] rounded-lg'>
                    <div className=' flex flex-col items-center gap-4'>
                        <div className='flex flex-col gap-[10px] w-full'>
                            <label htmlFor="gross-weight" className='text-white font-semibold text-sm'>Gross Weight</label>
                            <span className='text-white bg-[#213E7B7A] px-4 py-[11px] border border-[#FFFFFF14] rounded-[12px]'>{grossWeight ? grossWeight : "0"}</span>
                        </div>
                        <div className='flex flex-col gap-[10px] w-full'>
                            <label htmlFor="kg" className='text-white font-semibold text-sm'>Volumetric/Chargeable Weight</label>
                            <span className='text-white bg-[#213E7B7A] px-4 py-[11px] border border-[#FFFFFF14] rounded-[12px]'>{result ? result : "0"}</span>
                        </div>
                        <div className='flex flex-col gap-[10px] w-full'>
                            <label htmlFor="quantity" className='text-white font-semibold text-sm'>Cubic Meter</label>
                            <span className='text-white bg-[#213E7B7A] px-4 py-[11px] border border-[#FFFFFF14] rounded-[12px]'>{cubicMeter ? cubicMeter : "0"}</span>
                        </div>
                    </div>
                </Card>
                {clearResult ? (
                    <Button className='w-full mt-6 bg-[#213E7B] text-white border border-[#FFFFFF33] rounded-[90px] hover:bg-[#213E7B]/20' onClick={handleClearResult}>
                        Clear Results
                    </Button>
                ) : (
                    <Button 
                        className='w-full mt-6 bg-[#213E7B] text-white border border-[#FFFFFF33] rounded-[90px] hover:bg-[#213E7B]/20' 
                        onClick={calculate}
                    >
                        Calculate
                    </Button>
                )}
            </Card>
        </>
    );
}