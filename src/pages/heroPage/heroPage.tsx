import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hook'
import style from './heroPage.module.scss'
import { Hero } from '../../types'

function HeroPage() {

   const { id } = useParams()
   const navigate = useNavigate()
   const { heroes } = useAppSelector(state => state.heroes)
   const [hero, setHero] = useState<Hero>()

   useEffect(() => {
      const hero1 = heroes.find(item => item.id === Number(id))

      if (hero1 !== undefined) {
         setHero(hero1)
      }



   })


   return (
      <div className={style.heroPage}>

         <div onClick={() => navigate(-1)} className={style.heroPage__back}>
            <img src='./images/ArrowL.svg' />
            <p>Вернутся</p>
         </div>
         <div className={style.heroPage__nameHero}>{hero?.localized_name}</div>
         <div className={style.heroPage__attributes}>

            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Здоровье</div>
               {
                  hero !== undefined && <div className={style.heroPage__attribute}>{hero?.base_str * 20 + hero?.base_health}</div>
               }

            </div>

            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Мана</div>
               {
                  hero !== undefined && <div className={style.heroPage__attribute}>{hero?.base_int * 12 + hero?.base_mana}</div>
               }
            </div>
            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Дальность атаки</div>
               <div className={style.heroPage__attribute}>{hero?.attack_range}</div>
            </div>
            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Тип атаки</div>
               <div className={style.heroPage__attribute}>{hero?.attack_type}</div>
            </div>
            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Основной атрибут</div>
               <div className={style.heroPage__attribute}>{hero?.primary_attr}</div>
            </div>
            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Скорость передвижения</div>
               <div className={style.heroPage__attribute}>{hero?.move_speed}</div>
            </div>
            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Сила</div>
               <div className={style.heroPage__attribute}>{hero?.base_str}+{hero?.str_gain}</div>
            </div>
            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Ловкость</div>
               <div className={style.heroPage__attribute}>{hero?.base_agi}+{hero?.agi_gain}</div>
            </div>
            <div className={style.heroPage__attack}>
               <div className={style.heroPage__type}>Интеллект</div>
               <div className={style.heroPage__attribute}>{hero?.base_int}+{hero?.int_gain}</div>
            </div>

         </div>
         <div className={style.heroPage__roles}>
            <div className={style.heroPage__type}>Роли</div>
            <div className={style.heroPage__attribute}>
               {hero?.roles.join(', ')}</div>
         </div>
      </div>
   )
}

export default HeroPage
