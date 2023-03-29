

export interface Error {
   message: string
   name: string
   stack: string
}
export interface Hero {
   agi_gain: number
   attack_range: number
   attack_type:string
   base_agi:number
   base_health:number
   base_int:number
   base_mana:number
   base_str:number
   hero_id:number
   icon:string
   id:number
   img:string
   int_gain:number
   legs:number
   localized_name:string
   move_speed:number
   primary_attr:string
   roles:string[]
   str_gain:number

}