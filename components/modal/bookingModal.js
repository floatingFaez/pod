import { useState } from "react";
import { useForm } from "react-hook-form";
import HeaderSection from "@components/sections/headerSection"; 
import Button from "@components/ui/button";
import When from "@components/when";

const BookingModal = ({setModalShow, classes=''}) => {

    // const [isSuccess, setIsSuccess] = useState(false);
    // const [message, setMessage] = useState(false);
    const [step, setStep] = useState(1)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        setValue,
        formState: { errors, isSubmitSuccessful, isSubmitting }
    } = useForm({
        mode: "onTouched"
    });

    const onSubmit = data => {
        console.log({data})
    };

    return ( 
        <div className={`modal ${classes}`}>
            <button type="button" className="btn-close" onClick={() => setModalShow(false)}>
                <img src="/img/cross-black.svg" alt="cross-black"/>
            </button>
            <div className="modal-body grid content-between grid-rows-3 h-full">
                <HeaderSection title="Hey there!" subtitle='Schedule a discovery call' classes="border-0 mb-16 txt-black !pb-10 !pt-14"/>

                <form onSubmit={handleSubmit(onSubmit)} className={`my-5 form-steps txt-black row-span-2`}>
                    <When condition={step === 1}>
                        <div className="step flex flex-col grow justify-between h-full max-w-xs mx-auto">
                            <div className="step-content">
                                <p className="fss-1 uppercase font-secondary text-center mb-4">What’s involved?</p>
                                <p className="mb-5 fss-2 text-center">
                                    Pellentesque sed luctus nisi. Vestibulum sed massa eu velit egestas ultricies. 
                                    Nulla semper justo tristique mi eleifend, eu ultrices urna ullamcorper. 
                                    Nunc mattis cursus nunc et feugiat.
                                </p>
                            </div>
                            
                            <Button text="So, what day suits?" classes="border border-black py-4 px-8 hover:bg-gray-300 mt-3" handleClick={() => setStep(2)}/>
                        </div>
                    </When>
                    <When condition={step === 2}>
                        <div className="step flex flex-col grow justify-between h-auto max-w-xs mx-auto">
                            <div className="step-content">
                                <p className="mb-5 fss-2 text-center">
                                    Pellentesque sed luctus nisi. Vestibulum sed massa eu velit egestas ultricies. 
                                    Nulla semper justo tristique mi eleifend.
                                </p>
                                <ul className="list-none fss-1 checkbox-list font-secondary w-40">
                                    <li><label htmlFor="#monday">
                                        <input type="radio" name="day" value="Monday" id="monday" className="rounded-none radio-checkbox"/> MONDAY 
                                    </label></li>
                                    <li><label htmlFor="#tuesday">
                                        <input  type="radio" name="day" value="Tuesday" id="tuesday" className="rounded-none radio-checkbox"/> TUESDAY 
                                    </label></li>
                                    <li><label htmlFor="#wednesday">
                                        <input  type="radio" name="day" value="Wednesday" id="wednesday" className="rounded-none radio-checkbox"/> WEDNESDAY
                                    </label></li>
                                    <li><label htmlFor="#thursday">
                                        <input  type="radio" name="day" value="Thursday" id="thursday" className="rounded-none radio-checkbox"/> THURSDAY
                                    </label></li>
                                    <li><label htmlFor="#friday">
                                        <input  type="radio" name="day" value="Friday" id="friday" className="rounded-none radio-checkbox"/> FRIDAY
                                    </label></li>
                                </ul>
                            </div>
                            
                            <Button text="And a time preference?" classes="border border-black py-4 px-8 hover:bg-gray-300 mt-3" handleClick={() => setStep(3)}/>
                        </div>
                    </When>
                    <When condition={step === 3}>
                        <div className="step flex flex-col grow justify-between h-auto max-w-xs mx-auto">
                            <div className="step-content">
                                <p className="mb-5 fss-2 text-center">
                                    Pellentesque sed luctus nisi. Vestibulum sed massa eu velit egestas ultricies. 
                                    Nulla semper justo tristique mi eleifend.
                                </p>
                                <ul className="list-none fss-1 checkbox-list font-secondary">
                                    <li><label htmlFor="#morning">
                                        <input type="radio" name="time" value="Morning (9am - 12pm)" id="morning" className="rounded-none radio-checkbox"/> MORNING PLEASE (9am - 12pm)
                                    </label></li>
                                    <li><label htmlFor="#afternoon">
                                        <input  type="radio" name="time" value="Afternoon (2PM – 6PM)" id="afternoon" className="rounded-none radio-checkbox"/> AFTERNOON (2PM – 6PM)
                                    </label></li>
                                    <li><label htmlFor="#dinner">
                                        <input  type="radio" name="time" value="After dinner (7PM – 9PM)" id="dinner" className="rounded-none radio-checkbox"/> AFTER DINNER (7PM – 9PM)
                                    </label></li>
                                    <li><label htmlFor="#anytime">
                                        <input  type="radio" name="time" value="ANYTIME, ASAP!" id="anytime" className="rounded-none radio-checkbox"/> ANYTIME, ASAP!
                                    </label></li>
                                </ul>
                            </div>
                            
                            <Button text="Schedule call" classes="border border-black py-4 px-8 hover:bg-gray-300 mt-3" handleClick={() => setStep(1)}/>
                        </div>
                    </When>
                </form>
            </div>
        </div>
    );
}
 
export default BookingModal;