import { BrowserMultiFormatReader } from '@zxing/browser'
import { Result } from '@zxing/library'
import { useMemo, useRef } from 'react'
import { useDebounce } from 'react-use'

export const Scanner = onReadCode => {
  const videoRef = useRef()
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), [])

  useDebounce(async () => {
    if (!videoRef.current) return
    await codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
      if (!result) return
      if (error) {
        console.log('ERROR!! : ', error)
        return
      }
      onReadCode?.(result)
    })
  }, 2000)

  return <video style={{ width: '50%' }} ref={videoRef} />
}
