import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';



type HeroesState = {
   title: string
   selectOptions: string[]
   radioOption: string
}



const initialState: HeroesState = {
   title: '',
   selectOptions: [],
   radioOption: ''
}

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      changeTitle(state,action:PayloadAction<string>){
         state.title=action.payload
      },
      changeSelectOption(state,action:PayloadAction<string[]>){
         state.selectOptions=action.payload
      },
      changeRadioOption(state,action:PayloadAction<string>){
         state.radioOption=action.payload
      }
   },

});




export const {changeTitle, changeSelectOption,changeRadioOption} = filterSlice.actions;
export default filterSlice.reducer;


