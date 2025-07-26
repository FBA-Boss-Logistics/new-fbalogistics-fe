import { useState } from 'react';
import calculatorIcon from 'assets/svg/calculatorIcon.svg'
import { LabelledSelectField, LabelledTextField } from 'components';
import HeaderPage from 'components/HeaderPage'
import { Card } from 'components/ui/card'
import Results from './Results';

export default function Calculator() {
    const unitOfMeasurement = [
        {
            label: "kg",
            value: "kg"
        },
        {
            label: "lb",
            value: "lb"
        },
        
    ]
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [kg, setKg] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitMeasurement, setUnitMeasurement] = useState("");

    const [result, setResult] = useState("");
    const [grossWeight, setGrossWeight] = useState("");
    const [volumetricWeight, setVolumetricWeight] = useState("");
    const [clearResult, setClearResult] = useState(false)

    const [submit, setSubmit] = useState(false);

    function handleCalculate() {
        if (!unitMeasurement || !length || !width || !height || !weight || !kg || !quantity) {
            setClearResult(false);
            return;
        }
        else {
            setSubmit(true);
        }
        const result = (length * width * height) / 6000;
        const vw = result * quantity;
        const gw = weight * quantity * 1000;
        setResult(result);
        setGrossWeight(gw);
        setVolumetricWeight(vw);
        setClearResult(true);
    }

    function handleClearResult() {
        setResult("");
        setGrossWeight("");
        setVolumetricWeight("");
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
                        <div className='mt-6 flex items-center gap-4 w-1/2'>
                            <LabelledSelectField
                                label="Unit of measurement"
                                placeholder="Select unit"
                                className='w-full'
                                options={unitOfMeasurement}
                            />
                        </div>
                        <div className='mt-[21px] grid grid-cols-2 items-center gap-[14px]'>
                            <LabelledTextField
                                label="Unit of measurement"
                                placeholder="ex. 100"
                                className='w-full'
                                maxLength={50}
                                onChange={(e) => setUnitMeasurement(e.target.value)}
                                error={unitMeasurement === "" && submit}
                                helperText="Please select a unit of measurement"
                            />
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
                                className='w-full mt-[10px]'
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
                        <div className='mt-6 flex flex-row items-center gap-4'>
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
                                label="KG"
                                placeholder="kg"
                                className='w-full'
                                maxLength={50}
                                onChange={(e) => setKg(e.target.value)}
                                error={kg === "" && submit}
                                helperText="Please enter a valid kg"
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
                    <Results result={result} grossWeight={grossWeight} volumetricWeight={volumetricWeight} submit={submit} calculate={handleCalculate} clearResult={clearResult} handleClearResult={handleClearResult} />
                </div>
            </div>
        </>
    );
}