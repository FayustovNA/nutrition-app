import { ChangeEvent, useState } from 'react'

export type TState = {
    first_name?: string
    last_name?: string
    username?: string
    phone?: string
    email?: string
    role?: string
    password?: string
    confirmPassword?: string
    resetCode?: string
    gender?: string
    weight?: string | number
    height?: string | number
    waist?: string | number
    neck?: string | number
    hips?: string | number
}

const useForm = (inputValues: TState) => {
    const [values, setValues] = useState(inputValues)

    const handleChange = (
        event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { value, name } = event.target
        setValues({ ...values, [name]: value })
    }
    return { values, handleChange, setValues }
}

export default useForm