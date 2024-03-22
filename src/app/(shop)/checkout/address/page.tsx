import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getUserAddress, getCountries } from '@/actions';
import { auth } from '@/auth.config';

export default async function AddressPage() {

  const countries = await getCountries();
  const session = await auth()

  if( !session?.user ){
    return(
      <h3 className="text-3xl">500 - No hay sesión de usuario</h3>
    )
  }

  const userAddress = await getUserAddress( session.user.id ) || undefined;


  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-px sm:px-10'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Dirección' subtitle='Dirección de entrega' />

        <AddressForm countries={countries} userDbAddress={ userAddress } />
      </div>
    </div>
  );
}
