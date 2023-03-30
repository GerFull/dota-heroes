import {useState} from 'react'
import style from './heroitem.module.scss'

interface Props {
   name:string
   typeAttack:string
   roles:string[]
 }

function HeroItem(props: Props) {
   const {name ,typeAttack,roles} = props

   const [hover,setHover]=useState(false)

   const hoverMouse=()=>{
      setHover(true)
   }
   const leaveMouse=()=>{
      setHover(false)
   }

   return (
      <div onMouseEnter={hoverMouse} onMouseLeave={leaveMouse} className={style.heroes__item}>
         <div className={style.heroes__title}>{name}</div>

         <div className={style.heroes__attributeBox}>

            <div className={style.heroes__attack}>
               <div className={style.heroes__type}>Тип атаки</div>
               <div className={style.heroes__attribute}>{typeAttack}</div>
            </div>

            <div className={style.heroes__roles} >
               <div className={style.heroes__type}>Роль</div>
               <div className={style.heroes__attribute}>{roles.join(' ')}</div>
            </div>

         </div>
         {
            hover &&  <img src='./images/ArrowR.svg'/>
         }
        
      </div>
   )
}

export default HeroItem
