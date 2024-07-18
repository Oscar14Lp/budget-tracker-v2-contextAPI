import { useMemo } from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailsProps = {
    expense: Expense
}

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {

    const { dispatch } = useBudget()

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActs = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActs = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions >
    )

    return (
        <SwipeableList className=" mb-2.5">
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActs()}
                trailingActions={trailingActs()}
            >
                <div className=" bg-white shadow-lg p-5 w-full border-b border-[#c0ceda] flex gap-5 items-center">
                    <div className="">
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="Icono gasto"
                            className=" w-20"
                        />

                    </div>

                    <div className=" flex-1 space-y-2">
                        <p className=" text-sm font-bold uppercase text-[#4D869C]  "> {categoryInfo.name}</p>
                        <p className="text-[#3f6d80] ">{expense.expenseName}</p>
                        <p className=" text-[#7AB2B2] text-sm" >{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />

                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
