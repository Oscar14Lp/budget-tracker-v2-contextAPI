import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";


export default function FilterExpense() {

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'filter-expenses-by-cat', payload: { id: e.target.value } })
    }

    return (
        <div className=" bg-white shadow-lg rounded-lg p-10">
            <form >
                <div className=" flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select
                        id="category"
                        className=" bg-[#EEF7FF] p-3 flex-1 rounded"
                        onChange={handleChange}
                    >
                        <option value="">Todas las categorias</option>
                        {categories.map(category => (
                            <option
                                value={category.id}
                                key={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

            </form>

        </div>
    )
}
