import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterExpense from "./components/FilterExpense"


function App() {

  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className=" bg-[#4D869C] py-8 max-h-72">
        <h1 className="  text-center font-black text-4xl text-white" >
          PLANIFICADOR DE GASTOS v2
        </h1>
      </header>

      <div className=" max-w-3xl mx-auto bg-[#CDE8E5] shadow-lg rounded-lg mt-10 p-10 ">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <main className=" max-w-3xl mx-auto py-10">

          <FilterExpense />

          <ExpenseList />

          <ExpenseModal />
        </main>

      )}


    </>
  )
}

export default App