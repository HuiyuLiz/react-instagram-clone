/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import SearchIcon from '@/components/icon/searchicon'
import GridPostList from '@/components/shared/grid-post-list'
import { Heading } from '@/components/shared/heading'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'
import { useGetPosts, useSearchPosts } from '@/lib/tanstack-query/post-query'
import { isValueDefined } from '@/lib/utils'

export interface SearchResultProps {
  isSearchFetching: boolean
  searchedPosts: any
}

const SearchResults = ({
  isSearchFetching,
  searchedPosts
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <p>Loading...</p>
  } else if (
    isValueDefined(searchedPosts) &&
    searchedPosts.documents.length > 0
  ) {
    return <GridPostList posts={searchedPosts.documents} />
  } else {
    return (
      <p className="text-light-4 mt-10 w-full text-center">No results found.</p>
    )
  }
}

const Explore = () => {
  const { ref, inView } = useInView()
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch)

  useEffect(() => {
    if (inView && !isValueDefined(searchTerm)) {
      void fetchNextPage()
      console.log('fetchNextPage')
    }
  }, [fetchNextPage, inView, searchTerm])

  if (!isValueDefined(posts))
    return (
      <div className="flex-center h-full w-full">
        <p>Loading...</p>
      </div>
    )

  const showSearchResults = searchTerm !== ''
  const showPosts =
    !showSearchResults && posts.pages.every(item => item.documents.length === 0)

  return (
    <div className="space-y-8">
      <div className="relative flex w-full max-w-md items-center">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <Input
          className="w-full rounded-md border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>

      <Heading title="Popular Posts"></Heading>

      <div className="flex w-full max-w-5xl flex-wrap gap-9">
        {showSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : showPosts ? (
          <p className="text-light-4 mt-10 w-full text-center">End of posts.</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !isValueDefined(searchTerm) && (
        <div ref={ref} className="mt-10">
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default Explore
