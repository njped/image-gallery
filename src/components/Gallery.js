import React from 'react'
import Image from './Image.js'
import { useState } from 'react'
import { Container, Spinner, Row, Col } from 'react-bootstrap'
import { defaultReturn, singlePhotoReturn, categoryReturn } from '../utils/apiData.js'
import GlobalProvider, { useGlobalContext } from '../utils/globalContext.js'


// Accept props that allow it to search Home, Favorites, and by category
// Use the prop to get the needed images from the api
// use useState for loading state when waiting on api call





export default function Gallery({ page, path }) {
  const [state, dispatch] = useGlobalContext()
  const [isLoading, setLoading] = useState(false);
  const isTest = true

  let endpoint = getEndpoint(page, path, isTest);
  const data = isTest || Array.isArray(endpoint) ? [...endpoint] : fetchImages(endpoint)

  function getEndpoint(pageType, pathType, isTest = false) {

    if (isTest) {
      switch (pageType) {
        case 'home':
          return defaultReturn
        case 'favorites':
          return state.favoritedImages
        case 'category':
          return categoryReturn
      }
    } else {
      switch (pageType) {
        case 'home':
          return { endpoint: '/photos', queryParams: '&per_page=30&order_by=popular' }
        case 'favorites':
          return state.favoritedImages
        case 'category':
          return { endpoint: `/topics/${pathType}`, queryParams: '&per_page=30&order_by=popular' }
  
      }
    }
  }

  async function fetchImages({ endpoint, queryParams }) {
    const baseApi = "https://api.unsplash.com/"
    const clientId = "/?client_id%3DVoRzxjA3DwcsQJmfMgqasvB7OV_DV3p9NdNR0qIf06U"
  
    // https://api.unsplash.com/photo/:id/?client_id%3DVoRzxjA3DwcsQJmfMgqasvB7OV_DV3p9NdNR0qIf06U&per_page=30&order_by=popular
    let url = `${baseApi}${endpoint}${clientId}${queryParams}`
    try {
      const response = await fetch(url, { method: 'GET' })
      const imageData = await response.json()
    }
    catch (error) {
      return (
        console.error(error)
      )
    }
  }

  return (
    <Container>
      {isLoading ?
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        :
        <Row className="gx-3 gy-3">
          {data.map((image) => (
            <Col sm={12} md={6} xl={4} xxl={3} className="d-flex" key={image.id}>
              <Image
                imgData={{ ...image }}
                type='small'
              />
            </Col>
          ))}
        </Row>
      }
    </Container>
  )
}