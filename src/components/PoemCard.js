import React from 'react'
import '../styles/PoemCard.css'
/* Assets */
import PoemIcon from '../images/poem-icon.svg'

export default function PoemCard( {title, author} ) {
    return (
        <div className="poemContainer">
            <div className="imageContainer">
                <img className="image" src={PoemIcon} alt={"preview"} />
            </div>
            <div className="infoContainer">
                <div className="poemDesc">
                    <h2 >{title}</h2>
                    <p>By {author}</p>
                </div>
            </div>
        </div>
    )
}
