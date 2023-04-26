import React from 'react'
import Gallery from './Gallery'
import GlobalProvider, { useGlobalContext } from '../utils/globalContext'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/*
Have an isFavorite variable if favorite save it
Idea: Have a star pop up when hover over an image click on it to fill the star and also save it too favorites
Add Favorites and save it and array of objects the object will hold the id of the image
*/

export default function Favorites() {
  const [state, dispatch] = useGlobalContext()
  return (
    <>
      {state.favoritedImages.length === 0 ? 
        (
          <Container style={{
            position: 'relative'
          }}>
            <h4 className='text-center p-3' style={{
              margin: '0',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }}>
              Oh, you haven't favorited any images! <br /> Go find some nice images in the <Link to='/'>Gallery</Link></h4>
          </Container>
        ) : (
        <Gallery page="favorites" />
        )
      }
    </>
  )
}