import React, { useEffect } from 'react'
import Image from './Image.js'
import { useState } from 'react'
import { Container, Spinner, Row, Col } from 'react-bootstrap'
import { defaultReturn, singlePhotoReturn, categoryReturn } from '../utils/apiData.js'
import GlobalProvider, { useGlobalContext } from '../utils/globalContext.js'
import { faL } from '@fortawesome/free-solid-svg-icons'
import { PaginationControl } from 'react-bootstrap-pagination-control'

export default function Gallery({ page, path }) {
  const [state, dispatch] = useGlobalContext()
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState()
  const [pageNum, setPageNum] = useState(1)  
  const isTest = false
  
  let endpoint = getEndpoint(page, path, isTest);

  useEffect(() => {
    setLoading(true)
    if(isTest || Array.isArray(endpoint)) { 
      setLoading(false)
      setData({res:[...endpoint]})
    } else {
      fetchImages(endpoint)
    }
    console.log(data)
  }, [path])

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
          return { endpoint: '/photos', queryParams: `&per_page=30&order_by=popular&page=${pageNum}` }
        case 'favorites':
          return state.favoritedImages
        case 'category':
          return { endpoint: `/topics/${pathType}/photos`, queryParams: `&per_page=30&order_by=popular&page=${pageNum}` }
      }
    }
  }

  // async function fetchImages({ endpoint, queryParams }) {
  function fetchImages({ endpoint, queryParams }) {
    const baseApi = "https://api.unsplash.com"
    const clientId = "/?client_id=VoRzxjA3DwcsQJmfMgqasvB7OV_DV3p9NdNR0qIf06U"
  
    // https://api.unsplash.com/photo/:id/?client_id=VoRzxjA3DwcsQJmfMgqasvB7OV_DV3p9NdNR0qIf06U&per_page=30&order_by=popular
    let url = `${baseApi}${endpoint}${clientId}${queryParams}`

    // console.log('Gonna fetch: ', url)
    fetch(url, {method: 'GET', 'Content-Type': 'application/json'})
      .then(response => response.json().then(json => {
          setLoading(false)
          return setData({
            pages: response.headers.get('X-Total'),
            res: json
          })
        })
      )
      .catch(error => console.log('error', error));
  }

  return (
    <Container style={{
      position: 'relative'
    }}>
      {isLoading ?
        <Spinner animation="border" role="status" style={{
          padding: "100px",
          fontSize: '100px',
          position: 'absolute',
          left: '40%',
          top: '35%'
        }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        :
        <div>
          <Row className="gx-3 gy-3">
            {data.res.length ?
              data.res.map((image) => (
                <Col sm={12} md={6} xl={4} xxl={3} className="d-flex" key={image.id}>
                  <Image
                    imgData={{ ...image }}
                    type='small'
                  />
                </Col>
              )) : (
                <h4>No Results</h4>
              )
            }
          </Row>
          <div className='my-3'>

          <PaginationControl
            page={pageNum}
            between={4}
            total={data.pages}
            limit={1000}
            changePage={(page) => {
              setPageNum(page)
              fetchImages(endpoint)
            }}
            ellipsis={1}
            />
          </div>
        </div>
      }
    </Container>
  )
}