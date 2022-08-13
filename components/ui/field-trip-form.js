import { useState, useEffect } from "react";
import Button from "@components/ui/button";
import useWeb3Forms from "use-web3forms";

const FieldTripForm = ({classes,setActiveTab,register={register},isSuccess,message,formState={formState},type='horizontal'}) => {


    const [submitText,setSubmitText] = useState(false)

    const formClass = type === 'horizontal' ? 'grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5' : 'grid-rows-4 gap-5'
    const { errors, isSubmitSuccessful, isSubmitting } = formState;

    useEffect(()=>{
        if(isSubmitting){
            setSubmitText(<svg
                            className="w-5 h-5 mx-auto text-black animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
            )
        }else{
            setSubmitText('Submit Package')
        }

    },[isSubmitting])


    useEffect(() =>{
        if(isSubmitSuccessful && isSuccess){   
            console.log({isSubmitSuccessful})
            setActiveTab(5)
        }

    },[isSubmitSuccessful,isSuccess])

    return ( 

        <div className={`newsletter_body ${classes}`}>
            <div  className={`my-10 grid ${formClass} fss-1`}>
                <div className="mb-5 input-group text-left">
                    <input
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        className={`w-full rounded-none font-secondary  pr-2 py-3 border-b border-white autofill:bg-black-900 placeholder:uppercase  placeholder:text-gray-800 text-white outline-none placeholder:text-white bg-transparent ${
                        errors.first_name
                            ? "border-green focus:border-green ring-red-100 dark:ring-0"
                            : "border-white ring-gray-100 dark:ring-0"
                        }`}
                        {...register("first_name",{
                            required: "First name is required",
                            maxLength: 80
                        })}
                    />
                    {errors.first_name && (
                        <div className="mt-1 text-green">
                        <small>{errors.first_name.message}</small>
                        </div>
                    )}
                </div>

                <div className="mb-5 input-group text-left">
                    <input
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        className={`w-full rounded-none font-secondary pr-2 py-3 border-b border-white autofill:bg-black-900 placeholder:uppercase placeholder:text-gray-800 text-white outline-none placeholder:text-white bg-transparent ${
                        errors.last_name
                            ? "border-green focus:border-green ring-red-100 dark:ring-0"
                            : "border-white ring-gray-100 dark:ring-0"
                        }`}
                        {...register("last_name",{
                            required: "Last name is required",
                            maxLength: 80
                        })}
                    />
                    {errors.last_name && (
                        <div className="mt-1 text-green">
                        <small>{errors.last_name.message}</small>
                        </div>
                    )}
                </div>

                <div className="mb-5 input-group text-left">
                    <label htmlFor="email_address" className="sr-only">
                        Email Address
                    </label>
                    <input
                        id="email_address"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        autoComplete="off"
                        className={`w-full rounded-none font-secondary pr-2 py-3 border-b border-white autofill:bg-black-900 placeholder:uppercase placeholder:text-gray-800 text-white outline-none placeholder:text-white bg-transparent ${
                        errors.email
                            ? "border-green focus:border-green ring-red-100 dark:ring-0"
                            : "border-white ring-gray-100 dark:ring-0"
                        }`}
                        {...register("email",{
                            required: "Email is required",
                            maxLength: 80
                        })}
                    />
                    {errors.email && (
                        <div className="mt-1 text-green">
                        <small>{errors.email.message}</small>
                        </div>
                    )}
                </div>
                
                <div className="mb-0 input-group text-left"></div>

                <Button 
                    text={submitText}
                    type="submit"
                    // handleClick={() => setActiveTab(5)}
                    classes="border border-white py-4 px-20 hover:bg-gray-700 md:mt-8" />
            </div>

            {/* {isSubmitSuccessful && isSuccess && (
                <div className="mt-3 text-sm text-center text-green-500">
                {message || "Success. Message sent successfully"}
                </div>
            )} */}

            {isSubmitSuccessful && !isSuccess && (
                <div className="mt-3 text-sm text-center text-red-500">
                {message || "Something went wrong. Please try later."}
                </div>
            )}
        </div>
    );
}
 
export default FieldTripForm;