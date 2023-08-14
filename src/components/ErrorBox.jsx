/* eslint-disable react/prop-types */
const ErrorBox = ({title, message, onClose}) => {
    return (
        <div
            onClick={onClose} 
            className="fixed top-0 bg-black bg-opacity-60 w-full h-[100vh] flex justify-center items-center"
        >
            <div className="bg-white shadow-md rounded px-8 py-4 sm:w-[400px] w-[90%] text-center relative">
                <p 
                    onClick={onClose}
                    className="absolute right-4 top-2 font-bold cursor-pointer hover:text-gray-400"
                >
                    X
                </p>
                <p className="text-red-400 font-semibold">{title}</p>
                <p className="text-gray-400 mt-4">{message}</p>
            </div>
        </div>
    )
}

export default ErrorBox;