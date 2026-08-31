import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import toIco from 'to-ico'

const master = 'public/icons/backyard-downs-icon.png'
const outDir = 'public/icons'

const sizes = [
  { size: 16, name: 'favicon-16.png', ico: true },
  { size: 32, name: 'favicon-32.png', ico: true },
  { size: 48, name: 'favicon-48.png', ico: true },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
]

const icoBuffers = []

for (const { size, name, ico } of sizes) {
  const buffer = await sharp(master)
    .resize(size, size, { fit: 'cover' })
    .png()
    .toBuffer()
  await writeFile(join(outDir, name), buffer)
  if (ico) icoBuffers.push(buffer)
}

const ico = await toIco(icoBuffers)
await writeFile('public/favicon.ico', ico)

console.log('Generated icon files from', master)
