import { createSlice } from "@reduxjs/toolkit"


const initialState = {

    value: { isOpen: false }
}


export const modalToggle = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            return {
                value: {
                    ...state.value,
                    isOpen: action.payload.isOpen
                }
            }
        },
    }
})
export const { toggleModal } = modalToggle.actions;
export default modalToggle.reducer;