import React from 'react'
import styles from "./LikedPokemonCard.module.css"

const LikedPokemonCard = ({imageSrc,name}) => {
  return (
    <div classname={styles.bg}>
        <svg style={{marginLeft:"4%"}} width="250" height="200">       
      <image href={imageSrc} width="250"  height="200"/>
         </svg>
        <h2>{name}</h2>
    </div>
  )
}

export default LikedPokemonCard