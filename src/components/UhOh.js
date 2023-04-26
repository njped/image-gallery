import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function UhOh() {
  return (
    <>
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
        }}>These are not the droids that you're looking for. Return <Link to='/'>Home</Link></h4>
      </Container>
    </>
  )
}