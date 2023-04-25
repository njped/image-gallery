import React, { useState, useReducer } from 'react'
import { useGlobalContext } from '../utils/globalContext'
import { reducer, ADD_FAVORITE, REMOVE_FAVORITE } from '../utils/reducers'
import './Image.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons'


export default function Image({ imgData, type = 'regular'}) {
  const globalContext = useGlobalContext()
  const [state, dispatch] = useReducer(reducer, globalContext);
  // console.log(state.favoritedImages)
  const isFav = state.favoritedImages.some(img => img.id === imgData.id)
  const [isFavorite, setIsFavorite] = useState(isFav);

  function toggleFavorite() {
    setIsFavorite(!isFavorite)
    dispatch({
      type: isFavorite ? ADD_FAVORITE : REMOVE_FAVORITE,
      data: imgData
    })
    console.log(state)
    // logIt()
  }
  function logIt() {
  }

  return (
    <div className='imageContainer position-relative'>
      <img
        src={imgData.urls[type]}
        alt={imgData.alt_desciption}
        className="w-100"
      />
      <FontAwesomeIcon 
        onClick={toggleFavorite}
        icon={isFavorite ? heartSolid : heartRegular} 
        size='2x' 
        color='red' 
        className={`${isFavorite ? 'd-block' : 'd-none'} heartPosition position-absolute`}
      />
    </div>
  )
}