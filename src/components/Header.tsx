import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";


export default function Header() {

        const categories = useAppStore((state) => state.categories)
    
        const fetchCategories = useAppStore((state) => state.fetchCategories)

        useEffect(() => {
            fetchCategories()
        }, []) 

    const { pathname } = useLocation()

    const isHome = useMemo(() => pathname === '/' , [pathname])

    const [searchFilter, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    function handleChange(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>){
        setSearchFilters({
            ...searchFilter, [e.target.name]: e.target.value
        })
    
    }



  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-state-801' }>
        <div className="mx-auto container px-5 py-12">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logotipo" />
                </div>


                <nav className="flex gap-7">
                    <NavLink 
                    to="/"
                    className={({isActive})=> isActive? 'text-orange-500 uppercase font-bold':'text-white uppercase font-bold'}
                    >Inicio</NavLink>
                    <NavLink 
                    to="/favoritos"
                    className={({isActive})=> isActive? 'text-orange-500 uppercase font-bold':'text-white uppercase font-bold'}
                    >Favoritos</NavLink>
                </nav>

            </div>

            { isHome && (
                <form className="md:w-1/2 2x1:w-1/3 bg-orange-500 my-32 p-11 round" >
                    <div className="space-y-4">
                        <label htmlFor="ingredient"  className="block text-white uppercase font-extrabold text-lg">
                            Name o Ingredients 
                        </label>

                        <input id="ingredients" onChange={handleChange} value={searchFilter.ingredient}  type="text" name="ingredients" className='p-3 w-full rounded-lg focus:outline-none' placeholder='Nombre o Ingredientes. Ej. La Cocacola'/>

                    </div>
                    <div className="space-y-4">
                        <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">
                            La categoria 
                        </label>

                        <select id="ingredients" name="category" onChange={handleChange} value={searchFilter.category} className='p-3 w-full rounded-lg focus:outline-none'>
                            <option value="">-- Selecionar --</option>
                            {
                                categories.drinks.map(category => (
                                    <option
                                     value={category.strCategory}
                                     key={category.strCategory}>
                                        {category.strCategory}
                                     </option>
                                ))
                            }
                        </select>
                                     
                    </div>

                    <input type='submit' value='Buscar Recetas' className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase" />   

                </form>
            )}

        </div>
    </header>
  )
}