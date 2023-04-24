import React, { useState } from "react";
import Gallery from "./Gallery";
import { useLocation } from "react-router-dom";

export default function Categories({category}) {
  const [categorySlug, setCategorySlug] = useState()
  const location = useLocation()
  const slug = location.state?.slug

  return (
    <>
      <Gallery page='category' path={slug}/>
    </>
  )
}

/*
  Slugs that I will be using Wallpapers, Nature, Travel, Animals and Food & Drink
  Use a case/if statement to change the state of the slug
  Save the category in the slug variable
*/