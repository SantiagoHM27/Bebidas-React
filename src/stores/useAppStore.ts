import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipesSlice, RecipesSliceType } from './recipeSlice'

export const useAppStore = create<RecipesSliceType>( (...a) => ({
    ...createRecipesSlice(...a)
}))