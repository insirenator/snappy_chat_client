const Welcome = () => {
    return (
        <div className="flex flex-col items-center p-10">
            <img src="/robot.gif" className="sm:w-64 w-40 hue-rotate-180 hover:hue-rotate-90 transition-all"/>
            <p className="text-gray-500 text-sm">Open A Contact To Chat With Them.</p>
        </div>
    )
}

export default Welcome;