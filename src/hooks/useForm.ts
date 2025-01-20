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
    abdominal?: number | any
    weight?: number
    height?: number
    waist?: number | any
    neck?: number | any
    hips?: number | any
    age?: number
    chest?: number | any
    date?: any
    start_date?: any
    target_calories?: number | any
    target_carbohydrate?: number | any
    target_fat?: number | any
    target_fiber?: number | any
    target_protein?: number | any
    target_sugar?: number | any
    target_weight?: number | any
    coach?: any
    image?: any
    agree?: boolean;
    start_weight?: number | any
    re_new_password?: any
    new_password?: any
    current_password?: any
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