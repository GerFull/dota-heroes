import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeroItem from '../../components/HeroItem/heroitem';
import { InputTitle, MultiSelectDropdown, RadioSelect } from '../../components/input/input';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeSelectOption, changeTitle, changeRadioOption } from '../../store/slice/filter';
import { fetchHeroes, cnangePage, filterHeroes } from '../../store/slice/heroes';
import style from './homepage.module.scss'
import Modal from '../../components/modal/modal';




function HomePage() {

   const { error, filterHeroesArr, page, loading, } = useAppSelector((state) => state.heroes)
   const { title, selectOptions, radioOption, } = useAppSelector((state) => state.filter)
   const [windowInnerWidth, setwindowInnerWidth] = useState<number>(0)
   const [modal, setModal] = useState(false)
   const dispatch = useAppDispatch();
   const limit = 5

   useEffect(() => {

      dispatch(filterHeroes({ radioOption, selectOptions, title }))
   }, [title, selectOptions, radioOption])

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
      if (page !== Math.floor(filterHeroesArr.length / limit))
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


   return (<>
      {
         loading ? <div className={style.homepage__loading}><p>Loading...</p></div> :
            error ? <div className={style.homepage__loading}><p>An error occured: {error}</p></div> :
               <div className={style.homepage}>

                  <div className={style.homepage__main}>
                     <div className={style.homepage__title}>Dota heroes</div>
                     {
                        windowInnerWidth < 768 && <div onClick={() => setModal(true)} className={style.homepage__filterBtn}>
                           <img src='./images/Filters.svg' />
                           <p>Фильтры</p>
                        </div>
                     }

                     <div className={style.homepage__heroes}>
                        {
                           filterHeroesArr.slice(page * limit, (page * limit) + limit).map(item => (
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
                     windowInnerWidth > 768 &&
                     <div className={style.homepage__filter}>
                        <div className={style.homepage__filter_title}>Фильтры</div>
                        <div className={style.homepage__input}>
                           <InputTitle title={title} onChange={changeTitleFilter} />
                        </div>
                        <div className={style.homepage__multiselect}>
                           <MultiSelectDropdown title={'Роль'} selectOption={selectOptions} changeSelectOption={changeOption}
                              options={['Carry', 'Escape', 'Nuker', 'Initiator', 'Durable', 'Disabler', 'Support', 'Pusher']} />
                        </div>

                        <div className={style.homepage__radioSelect}>
                           <RadioSelect title={'Тип атаки'} onClick={changeRadio} selectValue={radioOption} option={['Ranged', 'Melee']} />
                        </div>
                     </div>
                  }

                  <Modal active={modal}>
                     <div className={style.homepage__filter}>
                        <div className={style.homepage__filter_title}>
                           <img onClick={() => setModal(false)} src='./images/ArrowL.svg' />
                           <p>Фильтры</p>
                        </div>
                        <div className={style.homepage__input}>
                           <InputTitle title={title} onChange={changeTitleFilter} />
                        </div>
                        <div className={style.homepage__multiselect}>
                           <MultiSelectDropdown title={'Роль'} selectOption={selectOptions} changeSelectOption={changeOption}
                              options={['Carry', 'Escape', 'Nuker', 'Initiator', 'Durable', 'Disabler', 'Support', 'Pusher']} />
                        </div>

                        <div className={style.homepage__radioSelect}>
                           <RadioSelect title={'Тип атаки'} onClick={changeRadio} selectValue={radioOption} option={['Ranged', 'Melee']} />
                        </div>

                     </div>
                  </Modal>
               </div>
      }

   </>

   )
}

export default HomePage
