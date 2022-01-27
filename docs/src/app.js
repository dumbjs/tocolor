import './styles/global.css'
import Input from '@zincui/input'
import Box from '@zincui/box'
import { useEffect, useState } from 'react'
import { parseToHex, hexToRGB, hexToHSL } from '../../dist/index'

const defaultHex = '#18181b'

export const App = () => {
  const [value, setValue] = useState(defaultHex)

  useEffect(() => {
    try {
      document.body.style.backgroundColor = '#' + parseToHex(value)
    } catch (err) {
      document.body.style.backgroundColor = '#' + parseToHex(defaultHex)
    }
  }, [value])

  let asHex = ''
  let asRGB = ''
  let asHSL = ''
  try {
    asHex = parseToHex(value)
    asRGB = hexToRGB(asHex)
    asHSL = hexToHSL(asHex)
  } catch (err) {
    asHex = parseToHex(defaultHex)
    asRGB = hexToRGB(asHex)
    asHSL = hexToHSL(asHex)
  }

  return (
    <>
      <h1>tocolor</h1>
      <a className='text-dim' href='https://github.com/barelyhuman/tocolor'>
        GitHub
      </a>
      <Box
        style={{
          flex: 1,
          display: 'flex',
          marginTop: '33%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box style={{ width: '100%' }}>
          <Input
            style={{
              height: 58,
              width: '100%',
              borderRadius: 10,
              paddingLeft: 26,
              paddingRight: 26
            }}
            placeholder='Enter a color value in hex, rgb, hsl'
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
          />

          <Box margin-12>
            <Box
              style={{
                backgroundColor: 'var(--zinc-800)',
                padding: 8,
                flex: 1,
                borderRadius: 10,
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <Box margin-8>
                <span className='text-dim'>HEX:</span> #{asHex.toUpperCase()}
              </Box>
              <Box margin-8>
                <span className='text-dim'>RGB:</span>{' '}
                {`(${asRGB.r},${asRGB.g},${asRGB.b})`}
              </Box>
              <Box margin-8>
                <span className='text-dim'>HSL:</span>{' '}
                {`(${asHSL.h},${asHSL.s},${asHSL.l})`}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
