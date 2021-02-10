import React, { SelectHTMLAttributes } from 'react'
import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
 label: string;
 name: string;
 options: {
   label: string;
   value: string;
 }[]
} 

const Select:React.FC<SelectProps> = ({label, name, options,...rest}) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select;