import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchHeroes, cnangePage } from '../../store/slice/heroes';



interface Props { }

function HomePage(props: Props) {
   const { } = props


   const { heroes, page } = useAppSelector((state) => state.heroes)
   const dispatch = useAppDispatch();
   const limit=10

   const changePage = () => {
      dispatch(cnangePage(page + 1))
   }

   console.log(page)
   console.log(heroes.slice(page*limit,(page*limit)+limit))


   return (
      <div>
         <div>
         <Link to={'/hero'}>Hero</Link>
         </div>
         {
            heroes.slice(page*limit,(page*limit)+limit).map(item=>(
               <div>
                  {item.id}
               </div>
            ))
         }
         <button onClick={changePage}>change</button>
      </div>
   )
}

export default HomePage
