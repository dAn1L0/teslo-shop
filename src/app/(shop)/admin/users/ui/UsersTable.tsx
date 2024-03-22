'use client';
import { changeRoleUser } from "@/actions";
import type { User } from "@/interfaces";


interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <table className='min-w-full divide-y-2'>
      <thead className='bg-gray-200 border-b'>
        <tr>
          <th
            scope='col'
            className='whitespace-nowrap text-sm font-medium text-gray-900 px-6 py-4 text-left'
          >
            #
          </th>
          <th
            scope='col'
            className='whitespace-nowrap text-sm font-medium text-gray-900 px-6 py-4 text-left'
          >
            Nombre
          </th>
          <th
            scope='col'
            className='whitespace-nowrap text-sm font-medium text-gray-900 px-6 py-4 text-left'
          >
            Correo
          </th>
          <th
            scope='col'
            className='whitespace-nowrap text-sm font-medium text-gray-900 px-6 py-4 text-left'
          >
            Rol
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {
          ( users.length > 0 )
          ? (
            users.map( (user,index) => (
              <tr key={user.id} className=' bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  { index + 1 }
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  { ( user.name ).toUpperCase() }
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  { ( user.email ).toLowerCase() }
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <select
                    className='w-28 text-sm text-gray-900 font-light px-1 py-2 whitespace-nowrap'
                    value={ user.role }
                    onChange={ (e) => changeRoleUser(user.id, e.target.value) }
                  >
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                  </select>
                </td>
              </tr>
            ))
          )
          : (
            <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
              <td colSpan={5} className='whitespace-nowrap text-center text-gray-800'>
                Al momento, no tiene usuarios
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}
