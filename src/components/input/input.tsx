import React, { useState, useRef } from 'react';

interface Props {
   options: string[];
   selectOption: string[]
   changeSeletctOption: (selectOptions: string[]) => void
}

export const MultiSelectDropdown: React.FC<Props> = ({ options, selectOption, changeSeletctOption }) => {

   const [open, setOpen] = useState(false)

   const changeSelect = (item: string) => {
      // если нету то добавить а если есть то удалить
      if (!selectOption.includes(item)) {
         changeSeletctOption([...selectOption, item])
      } else {
         changeSeletctOption(selectOption.filter(el => el !== item))
      }
   }



   return (
      <div >
         <div onClick={() => setOpen(!open)}>Выбранно {selectOption.length}</div>
         {open &&
            options.map(item => (
               <div onClick={() => changeSelect(item)}>{item}{selectOption.includes(item)&& 'select'}</div>
            ))
         }
      </div>
   );
};
