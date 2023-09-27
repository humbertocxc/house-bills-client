import { useEffect, useState } from 'react'

interface WindowSize {
  width?: number,
  height?: number,
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      
      handleResize()
      
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  if(!windowSize.width) return false
  const isMobile = windowSize.width <= 768
  return isMobile 
}

export default useWindowSize
