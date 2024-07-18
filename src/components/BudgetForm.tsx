import { ChangeEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {

    const [budget, setBugdet] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBugdet(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <form action="" className=" space-y-5" onSubmit={handleSubmit} >
            <div className=" flex flex-col space-y-5">
                <label htmlFor="budget" className=" text-4xl text-[#4D869C] font-bold text-center">Definir Presupuesto</label>

                <input
                    id="budget"
                    type="number"
                    className=" w-full bg-[#EEF7FF] border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>


            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-[#7AB2B2] hover:bg-[#5f8e8e] cursor-pointer w-full p-2 font-black text-[#e7f4ff] uppercase disabled:opacity-40"
                disabled={isValid}
            />

        </form>
    )
}
