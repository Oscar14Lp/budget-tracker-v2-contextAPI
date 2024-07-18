import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMsg from "./ErrorMsg";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    const [previousAmount, setPreviousAmount] = useState(0)

    const { dispatch, state, remainingBudget } = useBudget()

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })

    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validación
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        /// Validar no sobrepasar el limite establecido
        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('El presupuesto establecido es superado')
            return
        }


        /// Añade o actualizar el gasto
        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }


        // Reiniciar state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

        setPreviousAmount(0)

    }


    return (
        <form className="space-y-5 " onSubmit={handleSubmit}>
            <legend className=" uppercase text-center text-2xl font-black border-b-4 border-[#7AB2B2] py-2 text-[#4D869C] " >
                {state.editingId ? 'Actualizar Gasto' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMsg>{error}</ErrorMsg>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-2xl text-[#5e8888]"
                >Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre del gasto"
                    className="bg-[#EEF7FF]"
                    name='expenseName'
                    onChange={handleChange}
                    value={expense.expenseName}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-2xl text-[#5e8888]"
                >Cantidad:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 200"
                    className="bg-[#EEF7FF]"
                    name="amount"
                    onChange={handleChange}
                    value={expense.amount}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-2xl text-[#5e8888]"
                >Categoría:</label>
                <select
                    id="category"
                    className="bg-[#EEF7FF]"
                    name="category"
                    onChange={handleChange}
                    value={expense.category}
                >

                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-2xl text-[#5e8888]"
                >Fecha Gasto:</label>
                <DatePicker
                    className="bg-[#EEF7FF] p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-[#4D869C] cursor-pointer w-full p-2 text-[#ffffff] uppercase font-bold rounded-lg"
                value={state.editingId ? 'Guardar Gasto' : 'Registrar Gasto'}
            />



        </form>
    )
}
