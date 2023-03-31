import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeroItem from '../../components/HeroItem/heroitem';
import { InputTitle, MultiSelectDropdown, RadioSelect } from '../../components/input/input';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeSelectOption, changeTitle, changeRadioOption } from '../../store/slice/filter';
import { fetchHeroes, cnangePage } from '../../store/slice/heroes';
import style from './homepage.module.scss'




function HomePage() {

   const { heroes, page } = useAppSelector((state) => state.heroes)
   const { title, selectOptions, radioOption } = useAppSelector((state) => state.filter)
   const [windowInnerWidth, setwindowInnerWidth] = useState<number>(0)
   const dispatch = useAppDispatch();
   const limit = 5


   useEffect(() => {

   }, [title, selectOptions, radioOption])

   // const allFilters = () => {

   //    if (choiseClassArray.length > 0
   //       || choiseSubjectFilter !== ''
   //       || choiceLevelFilter !== ''
   //       || choiseWordFilter.length > 0) {

   //       getAllActivitiesArray().then(res => {
   //          let result = res.filter((elem) => {
   //             if (
   //                (elem.share === true) &&
   //                (elem.deleted !== true || elem.deleted === undefined) &&
   //                (choiseClassArray.length === 0 || elem.tagsClass.filter(x => choiseClassArray.includes(x.toLowerCase())).length > 0) &&
   //                (choiseWordFilter.length === 0 || elem.tagsWord?.filter(x => choiseWordFilter.includes(x.toLowerCase())).length > 0) &&
   //                (choiseSubjectFilter === '' || elem.tagsSubject?.find(str => str.toLowerCase().includes(choiseSubjectFilter.toLowerCase()))) &&
   //                (choiceLevelFilter === '' || elem?.levelComplexity === choiceLevelFilter)
   //             ) return elem;
   //          })
   //          setCards(result)
   //       })
   //       setFilter(false)
   //       setMoreBtn(false)
   //    } else {
   //       getAllActivitiesArray(12, 0).then(res => {
   //          setCards(res?.sort((cur, next) => {
   //             let alike = cur.like || 0
   //             let blike = next.like || 0
   //             if (alike > blike) return -1
   //             else if (alike === blike) return 0
   //             else return 1
   //          }).filter(item => item.share === true && (item.deleted !== true || item.deleted === undefined)))
   //       })
   //    }


   // }

   useEffect(() => {
      setwindowInnerWidth(document.documentElement.clientWidth)

      window.addEventListener("resize", handleWidth);

      return () => {

         window.removeEventListener("resize", handleWidth)
      };
   })


   const handleWidth = () => {
      setwindowInnerWidth(window.innerWidth)
   };


   const nextpage = () => {
      if (page !== Math.floor(heroes.length / limit))
         dispatch(cnangePage(page + 1))
   }

   const prevPage = () => {
      if (page !== 0) {
         dispatch(cnangePage(page - 1))
      }
   }


   const changeOption = (selectOptions: string[]) => {
      dispatch(changeSelectOption(selectOptions))
   }

   const changeTitleFilter = (title: string) => {
      dispatch(changeTitle(title))
   }

   const changeRadio = (title: string) => {
      dispatch(changeRadioOption(title))
   }



   return (
      <div className={style.homepage}>
         <div className={style.homepage__main}>
            <div className={style.homepage__title}>Dota heroes</div>
            {
                windowInnerWidth < 768 &&  <div className={style.homepage__filterBtn}>
                <img src='./images/Filters.svg' />
                <p>Фильтры</p>
             </div>
            }
           
            <div className={style.homepage__heroes}>
               {
                  heroes.slice(page * limit, (page * limit) + limit).map(item => (
                     <Link to={`/${item.id}`}><HeroItem name={item.localized_name} typeAttack={item.attack_type} roles={item.roles} /></Link>
                  ))
               }
            </div>
            <div className={style.homepage__pagination}>
               <img onClick={prevPage} src='./images/ChevronL.svg' />
               <p className={style.homepage__page}>{page + 1}</p>
               <img onClick={nextpage} src='./images/ChevronR.svg' />
            </div>
         </div>
         {
            windowInnerWidth > 768 && <div className={style.homepage__filter}>
            <div className={style.homepage__filter_title}>Фильтры</div>
            <div className={style.homepage__input}>
               <InputTitle title={title} onChange={changeTitleFilter} />
            </div>
            <div className={style.homepage__multiselect}>
               <MultiSelectDropdown title={'Роль'} selectOption={selectOptions} changeSelectOption={changeOption} options={['1', '2', '3', '4', '5', '5', '5']} />
            </div>

            <div className={style.homepage__radioSelect}>
               <RadioSelect title={'Тип атаки'} onClick={changeRadio} selectValue={radioOption} option={['1', '2']} />
            </div>
         </div>
         }
         

      </div>
   )
}

export default HomePage
