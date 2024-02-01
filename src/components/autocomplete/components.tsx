type OptionProps = {onClickHandle:()=>void, isSelected:boolean, label:string}

export const Option = ({onClickHandle, isSelected, label}:OptionProps) =>{
    return(
        <div
        onClick={onClickHandle}
        className={`${
          isSelected
            ? "bg-blue-300"
            : "hover:bg-gray-200"
        } cursor-pointer p-2 rounded-md`}
      >
        {label}
      </div>
    )

}