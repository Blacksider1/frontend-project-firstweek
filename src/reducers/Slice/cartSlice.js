import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  cartItems: [],
  basketId: "63908f52ffa0f82b8592b81e",
  token: localStorage.getItem('token'),
  decodedPayload: null,
  basket: {}
};

export const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(JSON.parse(jsonPayload));
    return JSON.parse(jsonPayload);
}

export const addBasket = createAsyncThunk(
  'basket/add',
  async ({basket, id}, thunkAPI) => {
    console.log(basket, id);
    try {
      const res = await fetch(`http://localhost:3001/basket/${basket}`, {
        method: 'PATCH',
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({product:{productId: id}}),
      });
      const data = await res.json();

      if(data.error) {
        return thunkAPI.rejectWithValue(data.error)
      }

      return thunkAPI.fulfillWithValue(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
);

export const getBasket = createAsyncThunk(
    'basket/get',
    async (_, thunkAPI) => {
      try {
        const res = await fetch('http://localhost:3001/basket/user', {
            method: "GET",
            headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6ODIyODgyODIsImlkIjoiNjM5MDhlODE5OWYxOWM5ZWRmNGFiZjAwIiwiZW1haWwiOiJhZG1pbkBtYWlsLnJ1Iiwicm9sZXMiOlsiVVNFUiJdLCJiYXNrZXQiOiI2MzkwOGY1MmZmYTBmODJiODU5MmI4MWUiLCJpYXQiOjE2NzA1MTEyNDIsImV4cCI6MTY3MDU5NzY0Mn0.A61Za1H6rx1ClOsQOY8wwmj8LlgGtvjjsU-9m7Cio9o"}
        });
        const basket = await res.json();
  
        if(basket.error) {
          return thunkAPI.rejectWithValue(basket.error)
        }
  
        return thunkAPI.fulfillWithValue(basket)
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    },
  );

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // parseJwt: (token) => {
    //     let base64Url = token.split('.')[1];
    //     let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));

    //     console.log(JSON.parse(jsonPayload));
    //     return JSON.parse(jsonPayload);
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(addBasket.fulfilled, (state, action) => {
        console.log(action.payload)
    })
    builder.addCase(getBasket.fulfilled, (state, action) => {
        state.basket = action.payload
    })
  },
});

export default cartSlice.reducer;
