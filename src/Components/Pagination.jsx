import React, { useEffect, useRef } from 'react'
import FlexBetween from './FlexBetween'
import { Button } from '@mui/material'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'

const Pagination = ({ metadata, setPage, page }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    scrollToSelectedPage()
  }, [page])

  const scrollToSelectedPage = () => {
    if (containerRef.current) {
      const selectedButton = containerRef.current.querySelector(
        `[data-page="${page}"]`
      )
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }

  const handlePageChange = newPage => {
    setPage(newPage)
  }

  return (
    <FlexBetween width={'100%'} ref={containerRef}>
      <Button
        disabled={page === 1}
        sx={{ width: '1rem' }}
        onClick={() => handlePageChange(page - 1)}
      >
        <ArrowLeft />
      </Button>
      <FlexBetween overflow={'auto'}>
        {Array.from(
          { length: metadata.last_page },
          (_, index) => index + 1
        ).map(n => (
          <Button
            key={n} // add a unique key for each button
            data-page={n} // add data-page attribute for identifying the button
            disabled={page === n}
            sx={{ width: '1rem' }}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </Button>
        ))}
      </FlexBetween>
      <Button
        disabled={page === metadata.last_page}
        sx={{ width: '1rem' }}
        onClick={() => handlePageChange(page + 1)}
      >
        <ArrowRight />
      </Button>
    </FlexBetween>
  )
}

export default Pagination
