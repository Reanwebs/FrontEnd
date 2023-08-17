export const useUserNameValidation = (value)=>{
    if(value === "") return "invalid"
}
export const useEmailValidation = (value)=>{
    if (value === "") return "invalid";
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) ? "valid" : "invalid";
}

export const useNumberValidation = (value)=>{
    if(value === "") return "invalid"
    else if (value.length < 10 || value.length > 10) return "invalid"
}

export const usePasswordValidation = (value) =>{
    if(value === "") return "invalid"
    else if (value.length < 7) return "invalid"
}

export const useCPasswordValidation = (password,cPassword)=>{
    if(cPassword === "") return "invalid"
    else if (password !== cPassword) return "invalid"
}

