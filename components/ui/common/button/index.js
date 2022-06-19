



export default function Button({
    children,
    className = "text-white bg-black hover:bg-black",
    invisible,
    ...rest

}) {

    return (
        <button
            {...rest}
            className={`px-8 py-3 border rounded-md text-base font-medium ${className} ${invisible && "invisible"}`}>
            {children}
        </button>
    )
}