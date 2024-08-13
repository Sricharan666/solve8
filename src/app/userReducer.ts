import { createReducer, on } from "@ngrx/store";
import { updateEmail, updateMobile, updateName } from "./actions";

let initialState = {
    name: "",
    email: "loremipsum@gmail.com",
    mobile: null,
};

export const userReducer = createReducer(
    initialState,
    on(updateName, (state: any, data: any) => ({ ...state, name: data.name })),
    on(updateEmail, (state: any, data: any) => ({ ...state, email: data.email })),
    on(updateMobile, (state: any, data: any) => ({ ...state, mobile: data.mobile }))
);

