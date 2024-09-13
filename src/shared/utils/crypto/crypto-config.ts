import 'dotenv/config'

import CryptoJS from 'crypto-js'

export default {
  key: process.env.ENCRYPT_KEY || '',
  options: {
    iv: CryptoJS.enc.Utf8.parse(process.env.ENCRYPT_IV || ''),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  },
}
