import style from './modal.module.scss'


interface Props {
   children: JSX.Element,
   active: boolean,

}

function Modal(props: Props) {
   const { active, children } = props

   return (
      <>
         {
            active ? 
            <div className={style.modal}  >
               {children}
            </div> : null
         }
      </>
   )


}

export default Modal
