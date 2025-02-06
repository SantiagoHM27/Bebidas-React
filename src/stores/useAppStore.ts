import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipesSlice, RecipesSliceType } from './recipeSlice'

export const useAppSore = create<RecipesSliceType>( (...a) => ({
    ...createRecipesSlice(...a)
}))