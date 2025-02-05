import { create } from 'zustand'
import { createRecipesSlice, RecipesSliceType } from './recipeSlice'

export const useAppSore = create<RecipesSliceType>( (...a) => ({
    ...createRecipesSlice(...a)
}))