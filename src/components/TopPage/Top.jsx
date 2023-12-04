import { useState } from 'react'
import { Scanner } from './Scanner'

export const Top = () => {
  const [codes, setCodes] = useState([])
  return (
    <div>
      <Scanner
        onReadCode={(result) => setCodes((codes) => Array.from(new Set([...codes, result.getText()])))}
      />
      <textarea value={codes.join('\n')} />
      <button type={'button'}>コピー</button>
    </div>
  )
}