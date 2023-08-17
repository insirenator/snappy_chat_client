import axios from "axios";
import { useEffect, useState } from "react";
import routes from "../api/routes";
import { BiCart, BiSolidCrown } from "react-icons/bi";

const loadRazorPayScript = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js",

        script.onload = () => {
            resolve();
        }

        script.onerror = () => {
            reject();
        }

        document.body.appendChild(script)
    })
}

const processPurchase = async (avatarId) => {
    console.log("processing payment for avatar id: ", avatarId);
    const storedUser = JSON.parse(localStorage.getItem("chat-app-user"));

    const { data } = await axios.get(`${routes.purchase}/${avatarId}`)

    const options = {
        key: 'rzp_test_9k3FK302IEMffU',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Purchase',
        description: 'Purchase Order for your Snappy Avatar.',
        image: routes.logo,
        // handler: function (response) {
        //     alert(response.razorpay_payment_id)
        //     alert(response.razorpay_order_id)
        //     alert(response.razorpay_signature)
        // },
        callback_url: `https://snappy-chat-service.onrender.com/api/avatars/paymentVerification?avatarId=${avatarId}&userId=${storedUser._id}`,
        prefill: {
            name: storedUser.username,
            email: storedUser.email,
        }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}

const BuyAvatars = () => {

    const [avatars, setAvatars] = useState(null);
    const [purchasedAvatars, setPurchasedAvatars] = useState(null);

    console.log(purchasedAvatars);

    useEffect(() => {
        loadRazorPayScript().then(() => {
            console.log("Razorpay SDK loaded successfully");
        }).catch(() => {
            console.log("Failed to load Razorpay SDK");
        })
    }, [])

    useEffect(() => {
        const fetchAvatars = async () => {
            const storedUser = JSON.parse(localStorage.getItem("chat-app-user"));

            const { data } = await axios.get(routes.premiumAvatars);
            setAvatars(data.data);

            const { data: { purchasedAvatars }} = await axios.get(`${routes.purchasedAvatars}/${storedUser._id}`);
            setPurchasedAvatars(purchasedAvatars.map(avatar => avatar.avatarId._id));
        }
        fetchAvatars();
    }, [])


    return (!avatars || !purchasedAvatars) ? (
        <img src="/loader.gif" className="w-32 h-32 loader fixed top-1/2 left-1/2 -translate-y-16 -translate-x-16"/>
    ) : (
        <div className="bg-gray-500 w-[95%] max-w-[900px] mx-auto my-4 lg:mt-16 p-8">
            <p className="text-yellow-400 text-2xl font-extrabold text-center mb-8 text">
                <BiSolidCrown className="inline mr-2"/>
                Premium Avatars 
                <BiSolidCrown className="inline ml-2"/>
            </p>
            {/* Avatars */}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
                {
                    avatars.map((avatar, idx) => (
                        <div 
                            key={idx}
                            className={
                                "bg-gray-700 rounded px-2 py-4 flex items-center justify-evenly shadow-xl" + 
                                (purchasedAvatars.includes(avatar._id) ? " grayscale" : "")
                            }
                        >
                            <div className="relative">
                                <img 
                                    src={`data:image/svg+xml;base64,${avatar.image}`}
                                    alt="avatar"
                                    className="w-12 sm:w-16 m-1 cursor-pointer"
                                />
                                <BiSolidCrown className="text-yellow-400 absolute top-0.5 right-0.5"/>
                            </div>
                            <div className="text-white font-light flex flex-col gap-2">
                                <p className="text-sm md:text-lg">&#8377; {avatar.price}</p>
                                <button
                                    disabled={purchasedAvatars.includes(avatar._id)}
                                    className="bg-purple-500 py-0.5 px-2 w-full rounded hover:bg-purple-600 disabled:bg-gray-600"
                                    onClick={() => processPurchase(avatar._id)}
                                >
                                    {
                                        !purchasedAvatars.includes(avatar._id) ? (
                                            <>
                                            Buy
                                            <BiCart className="inline"/>
                                            </>
                                        ) : (
                                            "Bought"
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BuyAvatars;