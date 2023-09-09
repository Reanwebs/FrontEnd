import {Select,SelectItem} from "@nextui-org/react" 

export default function Options({label,placeholder,data,handlechange}) {
  return (
    <Select
      isRequired
      label={label}
      placeholder={placeholder}
      className="w-fit"
      onChange={handlechange}
      name={label}
      
    >
      {data.map((value) => (
        <SelectItem key={value.type}  value={value.type} className="w-fit">
          {value.type}
        </SelectItem>
      ))}
    </Select>
    
  );
}
