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
    genderBMI?: string
    weight?: number
    height?: number
    waist?: number
    neck?: number
    hips?: number
    age?: number
    start_date?: any
    target_calories?: string
    target_carbohydrate?: string
    target_fat?: string,
    target_fiber?: string,
    target_protein?: string,
    target_sugar?: string,
    target_weight?: string,
    coach?: string,
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