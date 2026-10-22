import { Link } from 'react-router-dom'
import { CATEGORIES, CATEGORIES_KEYS } from '../constants'
import { useExpensesStore } from '../store/expensesStore'

export default function CategoriesPage() {
    const {expenses} = useExpensesStore()

    const rows = CATEGORIES_KEYS.map((key) => {
        const items = expenses.filter(el => el.category === key)
        return {
            key,
            count: items.length,
            sum: items.reduce((acc, v) => acc + v.amount, 0),
        }
    })
        .filter(r => r.count > 0)
        .sort ((a, b) => a.sum - b.sum )
    return (
        <>
            <h1 className="title">По категориям</h1>

            {rows.length === 0 ? (
                <p className="empty">
                    Данных пока нет. <Link to="/">Добавить расход</Link>
                </p>
            ) : (
                <ul className="list">
                    {rows.map((el, i) => (
                    <li className="row">
                        <span className="row__icon">
                            {CATEGORIES[el.key].emoji}
                        </span>
                        <div className="row__body">
                            <span className="row__title">
                                {CATEGORIES[el.key].label}
                            </span>
                            <span className="row__meta">
                                Колличество: {el.count}
                            </span>
                            </div>
                            <span className="row__amount">{el.sum}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
