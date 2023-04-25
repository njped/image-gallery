export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'


export function reducer(state, action) {
  switch(action.type) {
    case ADD_FAVORITE: 
      return {
        ...state,
        favoritedImages: [
          ...state.favoritedImages,
          action.data
        ]
      }
    case REMOVE_FAVORITE: 
      const updatedFavImages = state.favoritedImages.filter((image) => image.id !== action.data.id)
      return {...state, favoritedImages: [...updatedFavImages]}
    default: 
      return state
  }
}