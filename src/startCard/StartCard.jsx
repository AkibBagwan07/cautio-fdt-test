import React, { useState ,useEffect} from 'react'
import styles from "./StartCard.module.css"
import Cards from '../cards/Cards'
import axios from "axios"

const StartCard = () => {
    const [showCards,setShowCards] = useState(false)
    const [characterData,setCharacterData] = useState([])
    const [imageUrl,setImageUrl] = useState(null)
   // const [changeData,setChangeData] = useState(null)
   // console.log(characterData)
   // console.log(changeData)
   

    // const handleDataChange = ()=> {
    //     setChangeData(!changeData)
    // }
  
    let random = Math.floor(Math.random()*10)
     
    const API = `https://pokeapi.co/api/v2/pokemon/${random}`
    const imageMaker = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${random}.svg`
    // console.log(imageMaker)
    useEffect(()=>{
        (async function(){
            try {
          const data = await axios.get(API)
          console.log(data.data)
          setCharacterData(data.data)
          setImageUrl(imageMaker)
            } catch (error) {
                console.log(error)
            }
        })
        ()
    },[])

  return (
    <div>{showCards ? <Cards image={imageUrl} data={characterData}/>: <div>
        <h1 className={styles.heading}>PokeAPI</h1>
        <div className={styles.bg}>
            <div className={styles.logo}>
                logo
            </div>
            <div className={styles.typoParent}>
          <div className={styles.HowTo}>
          <h1>
            How to play PokeSwipe
          </h1>
          </div>
          <h2 className={styles.description}>
           Pokemon Appear One at a Time <br /> Choose "Like" or "Dislike" <br />
           build your Favourite Team
          </h2>
          </div>
        <button onClick={()=>{
            setShowCards(true)
        }}>Let's Go</button>
        </div>
        <div className={styles.multiple}></div>
        <div className={styles.multiple2}></div></div>}
    </div>
  )
}

export default StartCard