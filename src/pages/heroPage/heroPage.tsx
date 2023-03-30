import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hook'
import style from './heroPage.module.scss'


function HeroPage() {

   const { id } = useParams()
   const navigate = useNavigate()
   const { heroes } = useAppSelector(state => state.heroes)
   const hero = heroes.find(item => item.id === Number(id))

   return (
      <div className={style.heroPage}>
         <div onClick={() => navigate(-1)} className={style.heroPage__back}>
            <img src='./images/ArrowL.svg' />
            <p>Вернутся</p>
         </div>
         <div>Hero</div>
         <Link to={'/'}>Home</Link>
      </div>
   )
}

export default HeroPage
