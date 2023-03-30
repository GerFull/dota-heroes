import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeroItem from '../../components/HeroItem/heroitem';
import { MultiSelectDropdown } from '../../components/input/input';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeSelectOption } from '../../store/slice/filter';
import { fetchHeroes, cnangePage } from '../../store/slice/heroes';
import style from './homepage.module.scss'




function HomePage() {
   
   const { heroes, page } = useAppSelector((state) => state.heroes)
   const { title, selectOptions, radioOption } = useAppSelector((state) => state.filter)
   const dispatch = useAppDispatch();
   const limit = 5







   // console.log(heroes.slice(page*limit,(page*limit)+limit))

   const filter = () => {

   }


   const nextpage = () => {
      if(page !== Math.floor(heroes.length/limit))
      dispatch(cnangePage(page + 1))
   }

   const prevPage = () => {
      if (page !== 0) {
         dispatch(cnangePage(page - 1))
      }

   }

   const changeSeletctOption = (selectOptions: string[]) => {
      dispatch(changeSelectOption(selectOptions))
   }



   return (
      <div className={style.homepage}>
         <div className={style.homepage__main}>
            <div className={style.homepage__title}>Dota heroes</div>
            <div className={style.homepage__heroes}>
               {
                  heroes.slice(page * limit, (page * limit) + limit).map(item => (
                     <Link to={`/${item.id}`}><HeroItem name={item.localized_name} typeAttack={item.attack_type} roles={item.roles} /></Link>
                  ))
               }
            </div>
            <div className={style.homepage__pagination}>
               <img onClick={prevPage} src='./images/ChevronL.svg' />
               <p className={style.homepage__page}>{page+1}</p>
               <img onClick={nextpage} src='./images/ChevronR.svg' />
            </div>
         </div>
         <div className={style.homepage__filter}></div>

      </div>
   )
}

export default HomePage
