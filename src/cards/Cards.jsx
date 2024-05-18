/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styles from "./Cards.module.css"
import axios from "axios"

const Cards = ({image,data}) => {
   
  const [changeData,setChangeData] = useState(false)
  const [changedData,setChangedData] = useState(null)
  const [imageMaker,setImageMaker] = useState(null)
  const [lightDarkMode,setLightDarkMode] = useState(null)
  const [saveData,setSaveData] = useState(null)
  const setMode = () =>{
    setLightDarkMode(!lightDarkMode)
  }
 
  const handleLikeChangeData =() =>{
    setChangeData(!changeData)
    setSaveData(!saveData)
  }

  const handleDisikeChangeData =() =>{
    setChangeData(!changeData)
  }
 
    // console.log(imageMaker)
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
    },[changeData])
   
    useEffect(() => { localStorage.setItem('data', JSON.stringify([changedData])); }, [saveData]);
    
    return (
    <div> {changedData && <div>
      <div className={styles.headAndBtn}>
        <h1 className={styles.heading}>PokeAPI</h1><button className={styles.mode} onClick={setMode}>Day / Night</button></div>

        <div className={!lightDarkMode ? styles.bg :styles.bgNight}>
            <div className={!lightDarkMode ? styles.logo :styles.logoNight}>
               <h4>select your Favourite Pokemon</h4> 
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
        <div className={styles.multiple2}></div></div>}
    </div>
  )
}

export default Cards