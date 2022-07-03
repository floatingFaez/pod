import { useForm } from "react-hook-form";
import useWeb3Forms from "use-web3forms";
import Container from "@components/container";

const Newsletter = ({ siteconfig }) => {

  const apiKey = siteconfig?.w3ckey || "YOUR_ACCESS_KEY_HERE";

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

  const { submit: onSubmit } = useWeb3Forms({
    apikey: apiKey,
    from_name: "Stablo Template",
    subject: "New Contact Message from Stablo Website",
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    }
  });

    return ( 
        <Container>
            <div className="newsletter border-t">
                
                <div className="newsletter_header">
                    <div className="text-center">
                        <p className="mt-2 text-lg uppercase">Keep Upadted</p>
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
                    Dream Larger
                    </h1>
                </div>
                <div className="newsletter_body">
                    <form onSubmit={handleSubmit(onSubmit)} className="my-10 grid grid-cols-4 gap-5">
                        <input
                        type="checkbox"
                        id=""
                        className="hidden"
                        style={{ display: "none" }}
                        {...register("botcheck")}></input>

                        <div className="mb-5">
                        <input
                            type="text"
                            placeholder="First Name"
                            autoComplete="false"
                            className={`w-full pr-2 py-3 border-b dark:border-white placeholder:text-gray-800 dark:text-white outline-none dark:placeholder:text-gray-400 dark:bg-transparent  focus:ring-4  ${
                            errors.name
                                ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                                : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                            }`}
                            {...register("fname", {
                            required: "First name is required",
                            maxLength: 80
                            })}
                        />
                        {errors.fname && (
                            <div className="mt-1 text-red-600">
                            <small>{errors.fname.message}</small>
                            </div>
                        )}
                        </div>

                        <div className="mb-5">
                        <input
                            type="text"
                            placeholder="Last Name"
                            autoComplete="false"
                            className={`w-full pr-2 py-3 border-b dark:border-white placeholder:text-gray-800 dark:text-white outline-none dark:placeholder:text-gray-400 dark:bg-transparent   focus:ring-4  ${
                            errors.name
                                ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                                : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                            }`}
                            {...register("lname", {
                            required: "Last name is required",
                            maxLength: 80
                            })}
                        />
                        {errors.lname && (
                            <div className="mt-1 text-red-600">
                            <small>{errors.lname.message}</small>
                            </div>
                        )}
                        </div>

                        <div className="mb-5">
                        <label htmlFor="email_address" className="sr-only">
                            Email Address
                        </label>
                        <input
                            id="email_address"
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            autoComplete="false"
                            className={`w-full pr-2 py-3 border-b dark:border-white placeholder:text-gray-800 dark:text-white outline-none dark:placeholder:text-gray-400 dark:bg-transparent focus:ring-4  ${
                            errors.email
                                ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                                : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                            }`}
                            {...register("email", {
                            required: "Enter your email",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Please enter a valid email"
                            }
                            })}
                        />
                        {errors.email && (
                            <div className="mt-1 text-red-600">
                            <small>{errors.email.message}</small>
                            </div>
                        )}
                        </div>

                        <button
                        type="submit"
                        className="w-full newsletter-submit border font-semibold text-white transition-colors bg-gray-900 dark:hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200  dark:bg-transparent dark:text-white ">
                        {isSubmitting ? (
                            <svg
                            className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
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
                        ) : (
                            "Send Message"
                        )}
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
                
            </div>
        </Container>
    );
}
 
export default Newsletter;