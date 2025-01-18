import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const pdfConfig = {
    fonts: {
        THSarabunNew: path.join(__dirname, '../assets/fonts/THSarabunNew.ttf')
    },
    images: {
        logo: path.join(__dirname, '../assets/images/logo.png')
    }
}