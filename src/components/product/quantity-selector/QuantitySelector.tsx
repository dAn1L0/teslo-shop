'use client';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  quantity: number
  onQuantityChanged: ( value: number ) => void
}


export const QuantitySelector = ({ quantity, onQuantityChanged }:Props) => {

  const onValueChanged = ( value: number = 1 ) => {
    if( quantity + value < 1 ) return;
    onQuantityChanged( quantity + value )
  }

  return (
    <div className='flex'>
      <button
        onClick={ () => onValueChanged(-1) }>
        <IoRemoveCircleOutline size={18}/>
      </button>
      <span className="w-20 text-center mx-3 px-5 bg-gray-200 rounded">
        { quantity }
      </span>
      <button
        onClick={ () => onValueChanged() }>
        <IoAddCircleOutline size={18}/>
      </button>
    </div>
  )

}