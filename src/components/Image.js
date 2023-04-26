import React, { useState } from 'react'
import { useGlobalContext } from '../utils/globalContext'
import { reducer, ADD_FAVORITE, REMOVE_FAVORITE } from '../utils/reducers'
import './Image.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons'
import { json } from 'react-router-dom'


export default function Image({ imgData, type = 'regular'}) {
  const [state, dispatch] = useGlobalContext()
  const isFav = state.favoritedImages.some(img => img.id === imgData.id)
  const [isFavorite, setIsFavorite] = useState(isFav);

  function toggleFavorite() {
    dispatch({
      type: !isFavorite ? ADD_FAVORITE : REMOVE_FAVORITE,
      data: imgData
    })
    localStorage.setItem('favImages', JSON.stringify([...state.favoritedImages, imgData]))
    setIsFavorite(!isFavorite)
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