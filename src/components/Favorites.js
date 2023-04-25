import React from 'react'
import Gallery from './Gallery'

/*
Have an isFavorite variable if favorite save it
Idea: Have a star pop up when hover over an image click on it to fill the star and also save it too favorites
Add Favorites and save it and array of objects the object will hold the id of the image
*/

export default function Favorites() {
  return (
    <>
      <Gallery page="favorites"/>
    </>
  )
}