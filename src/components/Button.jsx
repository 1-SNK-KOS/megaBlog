


function Button({
  children, // or can be called as BtnText just for fancy s it is btw btn that's the reason
  type = 'button',
  className = '',
  textColor = "text-white",
  bgColor = "bg-blue-600",
  ...props
}
) {
  console.log("Button Component")
  return (
    <button className={`px-4 py-2 rounded-lg  ${textColor} ${bgColor} ${className}`} type={type} {...props}>
      {children}
      {/* {Btntext} */}
    </button>
  )
}

export default Button