import { useState } from "react";
import { BiCheck, BiCopy } from "react-icons/bi";
import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const searchParams = useSearchParams()[0];
    const [copied, setCopied] = useState(false);

    const copyHandler = () => {
        setCopied(true);

        navigator.clipboard.writeText(searchParams.get("reference"));

        setTimeout(() => {
            setCopied(false);
        }, 4000)
    }

    return (
        <div 
            className="p-4 flex flex-col items-center gap-4 my-32"
        >
            <img src={"/payment_success.png"} className="w-10"/>
            <h1 className="text-green-300 text-3xl font-extrabold">
                Payment Successful!
            </h1>
            <p className="text-gray-300">
                Reference ID : { searchParams.get("reference")}
            </p>

            <button 
            className="text-gray-300 hover:text-white text-sm px-1 py-0.5 rounded-lg "
            onClick={copyHandler}
            >
                Copy
            {
                !copied ? (
                    <BiCopy 
                className="inline ml-1 text-lg"
                />
                ) : (
                    <BiCheck
                className="inline ml-1 text-green-300 text-lg"
                />
                )
            }
            </button>
            <Link
                to="/setAvatar"
                className="text-red-300 hover:text-red-400 mt-20"
            >
                Go Back
            </Link>
        </div>
    )
}

export default PaymentSuccess;