import React, { useState } from 'react';
import style from './input.module.scss'

interface PropsMulti {
   options: string[];
   selectOption: string[]
   title: string
   changeSelectOption: (selectOptions: string[]) => void
}

interface PropsInput {
   title: string
   onChange: (title: string) => void
}

interface PropsRadio {
   selectValue: string
   option: string[]
   title: string
   onClick: (selectValue: string) => void
}

export const MultiSelectDropdown: React.FC<PropsMulti> = ({ options, title, selectOption, changeSelectOption }) => {

   const [open, setOpen] = useState(false)
   const [focus, setFocus] = useState(false)

   const changeSelect = (item: string) => {
      // если нету то добавить а если есть то удалить
      if (!selectOption.includes(item)) {
         changeSelectOption([...selectOption, item])
      } else {
         changeSelectOption(selectOption.filter(el => el !== item))
      }
   }


   const onBlur = () => {
      setFocus(false)
      setOpen(false)
   }


   return (
      <div tabIndex={0} onFocus={() => setFocus(true)} onBlur={onBlur} className={style.multiSelect} >
         <div className={style.multiSelect__title}>{title}</div>
         <div style={{ background: focus ? 'linear-gradient(180deg, rgba(188,117,255,1) 0%, rgba(121,143,255,1) 100%)' : '' }} className={style.multiSelect__border}>
            <div className={style.multiSelect__label} onClick={() => setOpen(!open)}>{selectOption.length === 0 ? 'Любой' : `Выбранно ${selectOption.length}`}
               <img onClick={() => setOpen(!open)}
                  className={style.multiSelect__img}
                  src={open ? './images/ChevronU.svg' : './images/ChevronD.svg'} />

            </div>
         </div>


         {open && <div className={style.multiSelect__options}>
            {
               options.map(item => (
                  <div
                     className={style.multiSelect__optionsItem}
                     onClick={() => changeSelect(item)}>
                     <img src={selectOption.includes(item) ? './images/CheckBoxY.svg' : './images/CheckBoxN.svg'} />
                     {item}
                  </div>
               ))
            }
         </div>
         }

      </div>
   );
};


export const InputTitle: React.FC<PropsInput> = ({ title, onChange }) => {

   const [value, setValue] = useState(title || '')
   const [focus, setFocus] = useState(false)

   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      if (onChange) {
         onChange(e.target.value)
      }
   }

   return (
      <div>
         <div className={style.input__title}>Название</div>
         <label className={style.input__label} style={{ background: focus ? 'linear-gradient(180deg, rgba(188,117,255,1) 0%, rgba(121,143,255,1) 100%)' : '' }}>
            <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className={style.input} onChange={onChangeInput} value={value} />
         </label>
      </div>
   )
}

export const RadioSelect: React.FC<PropsRadio> = ({ title, selectValue, option, onClick }) => {


   const changeRadio = (item: string) => {
      if (item === selectValue) {
         onClick('')
      } else {
         onClick(item)
      }
   }

   return (
      <div className={style.radio}>
         <div className={style.radio__title}>{title}</div>
         <div className={style.radio__options}> {
            option.map(item =>
               <div onClick={() => changeRadio(item)} className={style.radio__item}>
                  <img src={selectValue === item ? './images/RadioY.svg' : './images/RadioN.svg'} />
                  {item}
               </div>
            )

         }</div>
        

      </div>
   )
}