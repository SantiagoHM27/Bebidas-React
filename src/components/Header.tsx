import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSore } from "../stores/useAppStore";

export default function Header() {
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const fetchCategories = useAppSore((state) => state.fetchCategories)
    const categories = useAppSore((state) => state.categories)

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
        setSearchFilters({
            ...searchFilters, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink className={({ isActive }) => isActive ?
                            'text-violet-500 uppercase font-bold' :
                            'text-white uppercase font-bold'} to='/'>Inicio</NavLink>
                        <NavLink className={({ isActive }) => isActive ?
                            'text-violet-500 uppercase font-bold' :
                            'text-white uppercase font-bold'} to="/favoritos">Favoritos</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form className="md:w-1/2 2xl:w-1/3 bg-violet-400 my-32 p-10 rounded-lg shadow space-y-6">
                        <div className="space-y-4">
                            <label htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o ingredientes</label>
                            <input
                                id='ingredient'
                                type="text"
                                name="ingredient"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                                className="p-3 w-full rounded-lg focus:outline-none mb-5"
                                placeholder="chocolate, cafe, etc"
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categorías</label>
                            <select
                                id='category'
                                name="category"
                                onChange={handleChange}
                                value={searchFilters.category}
                                className="p-3 w-full rounded-lg focus:outline-none"
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="c1">C1</option>
                                <option value="c2">C2</option>
                                <option value="c3">C3</option>
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Buscar Recetas"
                            className="cursor-pointer bg-blue-800 hover:bg-orange-900
                        text-white font-extrabold w-full rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
