import React from 'react'
import Grid from '@mui/material/Grid';
import LikedPokemonCard from '../likedPokemonCard/LikedPokemonCard';
import styles from "./LikedPokemon.module.css"


const LikedPokemon = ({data}) => {
  return (
    <div>
      <img className={styles.pokeApi} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4-N-ufAv_ayZBkdF2AAZ0ACrMTvk_ZPhE7cL9hWTKw&s" alt="" />
      <h1>Pokemon You have Liked 💖</h1>
        <Grid container spacing={2}>
        {data.map((curr) => {
          if (curr.name!==null && curr.imageURL!==null){
          return (
            <Grid sx={{ border: 1 ,mt:3 , borderRadius: 8 , mr:2 , ml:10  ,background:"gray" }} item xs={12} sm={12} md={6} lg={3}>
              <LikedPokemonCard
                imageSrc={curr?.imageURL}
                name = {curr?.name}
              />
            </Grid>
          );
        }
        })}
      </Grid>
    </div>
  )
}

export default LikedPokemon