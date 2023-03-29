import React from 'react'
import { Link, useParams } from 'react-router-dom'

interface Props {}

function HeroPage(props: Props) {
   const {} = props

   const {id}=useParams()



   return (
      <div>
         <div>Hero</div>
         <Link to={'/'}>Home</Link>
      </div>
   )
}

export default HeroPage
