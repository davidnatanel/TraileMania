import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { APK } from '../routes/Routes'

export const addMovieSelect = createAsyncThunk("addMovieSelect", async (id) => {
  console.log(id)
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: APK,
        append_to_response: "videos"
      }
    })


    let movieSearch = data.videos.results.find((e) => e.name.toLowerCase() == 'official trailer' || e.name.toLowerCase() == 'official teaser [subtitled]' || e.name.toLowerCase() == 'official trailer [subtitled]')

    if (!movieSearch && data.videos.results.length > 0) {
      return data.videos.results[0]
    }

    return movieSearch;
  } catch (error) {
    return error.message
  }
})

const initialState = {
  reload: true,
  favorite: [],
  movieSelect: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    chargeFavorite: (state, action) => {

      if (localStorage.getItem("favorite") == null) {

        let nuevo = []
        localStorage.setItem('favorite', JSON.stringify(nuevo))

        state.favorite = []

      }




      state.favorite = JSON.parse(localStorage.getItem("favorite"))




    },

    addFavorite: (state, action) => {
      let foundFavorite = state.favorite.find(e => e.id == action.payload.id)
      if (!foundFavorite) {

        let a = JSON.parse(localStorage.getItem("favorite"))


        let newsave = [...a, action.payload]
        localStorage.setItem('favorite', JSON.stringify(newsave))

        state.favorite = [...state.favorite, action.payload]






      }

    },
    removeFavorite: (state, action) => {



      let findSeach = state.favorite.find(e => e.id == action.payload.id)


      if (findSeach) {

        let newsave = state.favorite.filter(e => e.id != action.payload.id)
        localStorage.setItem('favorite', JSON.stringify(newsave))

        state.favorite = newsave


      }
    }


  },

  extraReducers(builder) {
    builder
      .addCase(addMovieSelect.fulfilled, (state, action) => {
        console.log(action)
        state.movieSelect = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions
export const { addFavorite
  , removeFavorite, chargeFavorite, addMovie } = userSlice.actions

export default userSlice.reducer