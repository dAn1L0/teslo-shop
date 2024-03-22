export const revalidate = 0;
import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function UsersAdminPage() {

  const { ok, users } = await getPaginatedUsers();
  if(!ok) {
    redirect('/auth/login')
  }

  return (
    <div className='px-px sm:px-10'>
      <Title title='Administrador de usuarios' />
      <div className='overflow-x-auto mb-10'>
        <UsersTable users={users}/>
      </div>
    </div>
  );
}
