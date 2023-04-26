import React from "react";
import Gallery from "./Gallery";
import { useLocation } from "react-router-dom";

export default function Categories() {
  const location = useLocation()
  const slug = location.state?.slug ? location.state.slug : getSlugFromPath()

  function getSlugFromPath()
  {
    const lastSegment = location.pathname.split('/').pop()
    return lastSegment
  }

  return (
    <>
      <Gallery page='category' path={slug}/>
    </>
  )
}