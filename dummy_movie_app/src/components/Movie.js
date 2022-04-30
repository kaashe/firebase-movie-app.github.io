import React from 'react'
import  classes from './Movie.module.css';
const Movie = (props) => {
  return (
    <div>
        <li className='movie'>
        
        <h2>{props.title}</h2>
        <h2>{props.releaseDate}</h2>
        <h3>{props.openingText}</h3>
        </li>
    </div>
  )
}

export default Movie