export default function InputField({name, label, placeholder, type, isRequired}) {
  return (
    <>
      <div className="w-full outline-emerald-300 flex flex-col gap-1 my-3">
        <div className="text-left font-medium text-lg">{label}</div>
        <input className="rounded-sm outline outline-1 w-full p-2"
        type={type}
        name={name}
        placeholder={placeholder} required={isRequired}/>
      </div>
    </>
  )
}