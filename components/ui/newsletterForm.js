import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import useWeb3Forms from "use-web3forms";

const NewsLetterForm = ({ status, cmessage, onValidated, classes,type='horizontal'}) => {

    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState(false);
    // Please update the Access Key in the Sanity CMS - Site Congig Page
    // const apiKey = siteconfig?.w3ckey || "YOUR_ACCESS_KEY_HERE";

    const formClass = type === 'horizontal' ? 'grid-cols-1 md:grid-cols-4 md:grid-rows-1 gap-5' : 'grid-rows-4 gap-5'

    useEffect(()=>{
        if(status && cmessage && 'error' === status){
            setMessage(cmessage)
            setIsSuccess('error' !== status)
        }
        if(status && cmessage && 'success'=== status){
            setMessage(cmessage)
            setIsSuccess('success'=== status && 'error' !== status)
        }
    },[cmessage,status])


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
        const isFormValidate = onValidated(data)
    };

    // const { submit: onSubmit } = useWeb3Forms({
    //     apikey: apiKey,
    //     from_name: "Stablo Template",
    //     subject: "New Contact Message from POD",
    //     onSuccess: (msg, data) => {
    //         setIsSuccess(true);
    //         setMessage(msg);
    //         reset();
    //     },
    //     onError: (msg, data) => {
    //         setIsSuccess(false);
    //         setMessage(msg);
    //     }
    // });

    return ( 

        <div className={`newsletter_body ${classes}`}>
            <form onSubmit={handleSubmit(onSubmit)} className={`my-10 grid ${formClass} fss-1`}>
                <div className="mb-5 input-group">
                    <input
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        className={`w-full rounded-none font-secondary  pr-2 py-3 border-b border-white autofill:bg-black-900 placeholder:uppercase  placeholder:text-gray-800 text-white outline-none placeholder:text-white bg-transparent ${
                        errors.FNAME
                            ? "border-green focus:border-green ring-red-100 dark:ring-0"
                            : "border-white ring-gray-100 dark:ring-0"
                        }`}
                        {...register("FNAME", {
                            required: "First name is required",
                            maxLength: 80
                        })}
                    />
                    {errors.FNAME && (
                        <div className="mt-1 text-green">
                        <small>{errors.FNAME.message}</small>
                        </div>
                    )}
                </div>

                <div className="mb-5 input-group">
                    <input
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        className={`w-full rounded-none font-secondary pr-2 py-3 border-b border-white autofill:bg-black-900 placeholder:uppercase placeholder:text-gray-800 text-white outline-none placeholder:text-white bg-transparent ${
                        errors.LNAME
                            ? "border-green focus:border-green ring-red-100 dark:ring-0"
                            : "border-white ring-gray-100 dark:ring-0"
                        }`}
                        {...register("LNAME", {
                            required: "Last name is required",
                            maxLength: 80
                        })}
                    />
                    {errors.LNAME && (
                        <div className="mt-1 text-green">
                        <small>{errors.LNAME.message}</small>
                        </div>
                    )}
                </div>

                <div className="mb-5 input-group">
                    <label htmlFor="email_address" className="sr-only">
                        Email Address
                    </label>
                    <input
                        id="email_address"
                        type="email"
                        placeholder="Email Address"
                        name="EMAIL"
                        autoComplete="off"
                        className={`w-full rounded-none font-secondary pr-2 py-3 border-b border-white autofill:bg-black-900 placeholder:uppercase placeholder:text-gray-800 text-white outline-none placeholder:text-white bg-transparent ${
                        errors.EMAIL
                            ? "border-green focus:border-green ring-red-100 dark:ring-0"
                            : "border-white ring-gray-100 dark:ring-0"
                        }`}
                        {...register("EMAIL", {
                            required: "Enter your email",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Please enter a valid email"
                            }
                        })}
                    />
                    {errors.EMAIL && (
                        <div className="mt-1 text-green">
                        <small>{errors.EMAIL.message}</small>
                        </div>
                    )}
                </div>

                <button
                type="submit"
                className="w-full rounded-none font-secondary  uppercase newsletter-submit border font-regular text-white transition-colors hover:bg-gray-800 focus:outline-none  bg-transparent text-white ">
                {isSubmitting ? (
                    <svg
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
                ) : ("Submit")}
                </button>
            </form>

            {isSubmitSuccessful && isSuccess && (
                <div className="mt-3 text-sm text-center text-green-500">
                {message || "Success. Message sent successfully"}
                </div>
            )}
            {isSubmitSuccessful && !isSuccess && (
                <div className="mt-3 text-sm text-center text-red-500">
                {message || "Something went wrong. Please try later."}
                </div>
            )}
        </div>
    );
}
 
export default NewsLetterForm;