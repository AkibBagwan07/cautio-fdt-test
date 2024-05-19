/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styles from "./Cards.module.css"
import axios from "axios"
import LikedPokemon from '../likedPokemon/LikedPokemon'

const Cards = ({image,data}) => {

   // used states for updating data and doing some conditional rendering

  const [checkToChangeData,setCheckToChangeData] = useState(false)
  const [changedData,setChangedData] = useState(null)
  const [imageMaker,setImageMaker] = useState(null)
  const [lightDarkMode,setLightDarkMode] = useState(null)
  const [saveData,setSaveData] = useState(null)
  const [dataOfSessionStorage,setDataOfSessionStorage] = useState()
  const [navigateToLikedPok,setNavigateToLikedPok] = useState(false)


  // setMode function is used to make change the ui mode to day/night
  const setMode = () =>{
    setLightDarkMode(!lightDarkMode)
  }
 

 // used handleLikeChangeData for change the card and change the state of saveData for side-effect / saving the data to sessionStorage if liked by user
  const handleLikeChangeData =() =>{
    setCheckToChangeData(!checkToChangeData)
    setSaveData(!saveData)
  }

// used handleDisikeChangeData for change the card 
  const handleDisikeChangeData =() =>{
    setCheckToChangeData(!checkToChangeData)
  }
 
    // console.log(imageMaker)
    //api call to get the next fresh data for next cards of pokemons
    useEffect(()=>{
        (async function(){
          let random = Math.floor(Math.random()*100)
     
          const API = `https://pokeapi.co/api/v2/pokemon/${random}`
          const currImageMaker = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${random}.svg`
          
            try {
          const data = await axios.get(API)
           console.log(data.data)
          setChangedData(data.data)
          setImageMaker(currImageMaker)
        } catch (error) {
                console.log(error)
            }
        })
        ()
    },[checkToChangeData])
   

    //used for getting data and adding the liked card's data to sessionStorage
    useEffect(() => {
     let newObj ={
        name: changedData?.forms.map((curr)=>curr.name),
        abilities: changedData?.abilities.map((curr)=>curr.ability.name),
        imageURL: imageMaker
        }
        
        const currData = JSON.parse(sessionStorage.getItem('data')) || []
        sessionStorage.setItem('data', JSON.stringify([...currData, newObj]))
        setDataOfSessionStorage(currData)
  
    }, [saveData]);
    
    return (
    <div> { navigateToLikedPok===true ? <LikedPokemon data={dataOfSessionStorage}/> : <div> {changedData && <div key={changedData.id}>
      <div className={styles.headAndBtn}>
       <button onClick={()=>{
           setNavigateToLikedPok(true)
       }} className={styles.likedPokemons}>Liked Pokemon's</button><img className={styles.pokeApi} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4-N-ufAv_ayZBkdF2AAZ0ACrMTvk_ZPhE7cL9hWTKw&s" alt="" />
       <button className={styles.mode} onClick={setMode}>Day / Night</button></div>

        <div className={!lightDarkMode ? styles.bg :styles.bgNight}>
            <div className={!lightDarkMode ? styles.logo :styles.logoNight}>
               <h4>Select your Favourite Pokemon</h4> 
            </div>
            <svg style={{marginLeft:"4%"}} width="250" height="200">       
      <image href={imageMaker} width="250"  height="200"/>
         </svg>
          <div>
          <h1 className={!lightDarkMode ? styles.name :styles.nameNight}>
           {changedData && changedData.forms.map((curr)=>curr.name)}
          </h1>
          <div className={styles.abilities}>
           {changedData && changedData.abilities.map((curr)=><p className={styles.ability}>{curr.ability.name}</p>)}
          </div>
          </div>
          <div className={styles.buttonAlign}>
        <button className={styles.BtnDislike} onClick={handleDisikeChangeData}>Dislike </button>
        <button className={styles.BtnLike} onClick={handleLikeChangeData}>Like </button>
          </div>
        </div>  
        <div className={styles.multiple}></div>
        <div className={styles.multiple2}></div></div>}</div>}
    </div>
  )
}

export default Cards