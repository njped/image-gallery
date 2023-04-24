import React from 'react'
import './Image.css'

export default function Image({ src, description, alt, type = 'thumb'}) {

  return (
      <img
        src={src[type]}
        alt={alt}
        className="w-100"
      />
  )
}