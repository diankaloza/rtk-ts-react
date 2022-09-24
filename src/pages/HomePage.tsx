import { useEffect, useState } from 'react'

import { RepoCart } from 'components/repoCard/RepoCart'
import { useDebounce } from 'hooks/useDebounce'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from 'store/github/github.api'

export const HomePage = () => {
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search)
  const [dropdown, setDropDown] = useState(false)
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  })
  const [fetchRepos, { isLoading: isReposLoading, data: repos }] = useLazyGetUserReposQuery()

  useEffect(() => {
    setDropDown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data])

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropDown(false)
  }
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && <h1 className='text-center text-red-700'> Something went wrong...</h1>}

      <div className='relative w-[560px]'>
        <input
          className='border py-2 px-4 w-full h-[42px] mb-2'
          type='text'
          placeholder='Search for GitHub username...'
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className=' list-none absolute top-[42px] left-0 right-0 overflow-y-scroll max-h-[200px] shadow-md bg-white'>
            {isLoading && <p className='text-center'> Loading...</p>}
            {data?.map((user) => (
              <li
                onClick={() => clickHandler(user.login)}
                key={user.id}
                className='py-2 px-4 hover:bg-pink-600 hover: text-black transitions-colors cursor-pointer'
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className='container'>
          {isReposLoading && <p className='text-center'>Repos are loaading...</p>}
          {repos?.map((repo) => (
            <RepoCart repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
