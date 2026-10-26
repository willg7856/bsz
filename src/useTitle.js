import { useEffect } from 'react'

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Beyond Stage Zero` : 'Beyond Stage Zero'
  }, [title])
}
