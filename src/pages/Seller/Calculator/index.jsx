import { useState } from 'react';
import calculatorIcon from 'assets/svg/calculatorIcon.svg'
import { LabelledSelectField, LabelledTextField } from 'components';
import HeaderPage from 'components/HeaderPage'
import { Card } from 'components/ui/card'
import Results from './Results';

export default function Calculator() {
    const [unitMeasurement, setUnitMeasurement] = useState({
        label: "KG/CM",
        value: "kg/cm"
    });
    const unitOfMeasurement = [
        {
            label: "KG/CM",
            value: "kg/cm",
        },
        {
            label: "LB/IN",
            value: "lb/in"
        },
        
    ]
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [quantity, setQuantity] = useState("");

    const [resultVolumetric, setResultVolumetric] = useState("");
    const [grossWeight, setGrossWeight] = useState("");
    const [cubicMeter, setCubicMeter] = useState("");
    const [clearResult, setClearResult] = useState(false)

    const [submit, setSubmit] = useState(false);

    function handleCalculate() {
        if (!length || !width || !height || !weight || !quantity) {
            setClearResult(false);
            return;
        }
        else {
            setSubmit(true);
        }
        if (unitMeasurement?.value === "kg/cm") {
            const resultVolumetric = ((length * width * height) / 6000) * quantity;
            const resultCubicMeter = ((length * width * height) / 1000000) * quantity;
            const resultGross = weight * quantity;
            setResultVolumetric(resultVolumetric);
            setGrossWeight(resultGross);
            setCubicMeter(resultCubicMeter);
            setClearResult(true);
        }
        else if (unitMeasurement?.value === "lb/in") {
            const resultVolumetric = ((length * width * height) / 366) * quantity;
            const resultCubicMeter = ((length * width * height) / 61023.74) * quantity;
            const resultGross = weight * quantity;
            setResultVolumetric(resultVolumetric);
            setGrossWeight(resultGross);
            setCubicMeter(resultCubicMeter);
            setClearResult(true);
        }
    }

    function handleClearResult() {
        setResultVolumetric("");
        setGrossWeight("");
        setCubicMeter("");
        setClearResult(false);
    }

    return (
        <>
            <HeaderPage title="Chargeable Weight Estimator" home="seller" pathname="Calculator" />
            <div className='flex flex-col md:flex-row gap-6 w-full'>
                <div className='flex-grow mt-6'>
                    <Card className='overflow-hidden p-6'>
                        <div className='flex items-center gap-4 pt-[6px] pb-2'>
                            <img src={calculatorIcon} alt="calculator" className='w-8 h-8' />
                            <h1 className='text-lg font-semibold text-[#111827]'>Calculator</h1>
                        </div>
                        <div className='mt-6 flex items-center gap-4 md:w-1/2 w-full'>
                            <LabelledSelectField
                                label="Unit of measurement"
                                placeholder="Select unit"
                                className='w-full'
                                value={unitMeasurement || null}
                                options={unitOfMeasurement}
                                error={unitMeasurement === "" && submit}
                                onChange={(event, value) => setUnitMeasurement(value)}
                            />
                        </div>
                        <div className='mt-[21px] grid grid-cols-2 items-center gap-[14px]'>
                            <LabelledTextField
                                label="Length"
                                placeholder="ex. 100"
                                className='w-full'
                                maxLength={50}
                                onChange={(e) => setLength(e.target.value)}
                                error={length === "" && submit}
                                helperText="Please enter a valid length"
                            />
                            <LabelledTextField
                                label="Width"
                                placeholder="ex. 200"
                                className='w-full'
                                maxLength={50}
                                onChange={(e) => setWidth(e.target.value)}
                                error={width === "" && submit}
                                helperText="Please enter a valid width"
                            />
                            <LabelledTextField
                                label="Height"
                                placeholder="ex. 100"
                                className='w-full mt-[10px]'
                                maxLength={50}
                                onChange={(e) => setHeight(e.target.value)}
                                error={height === "" && submit}
                                helperText="Please enter a valid height"
                            />
                        </div>
                        <div className='mt-6 flex md:flex-row flex-col items-center gap-4'>
                            <LabelledTextField
                                label="Gross Weight"
                                placeholder="ex. 100"
                                className='w-full'
                                maxLength={50}
                                onChange={(e) => setWeight(e.target.value)}
                                error={weight === "" && submit}
                                helperText="Please enter a valid weight"
                            />
                            <LabelledTextField
                                label="Quantity"
                                placeholder="1"
                                className='w-full'
                                maxLength={50}
                                onChange={(e) => setQuantity(e.target.value)}
                                error={quantity === "" && submit}
                                helperText="Please enter a valid quantity"
                            />
                        </div>
                    </Card>
                </div>
                <div className='w-full md:w-[30%] mt-6'>
                    <Results result={resultVolumetric} grossWeight={grossWeight} cubicMeter={cubicMeter} submit={submit} calculate={handleCalculate} clearResult={clearResult} handleClearResult={handleClearResult} />
                </div>
            </div>
        </>
    );
}