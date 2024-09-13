import { AES, enc } from 'crypto-js'
import cryptoConfig from './crypto-config'

interface CryptoProps {
    data: string
}

class Crypto {
    encrypt({ data }: CryptoProps) {
        const cipher = AES.encrypt(data, cryptoConfig.key)
        return cipher.toString()
    }

    decrypt({ data }: CryptoProps) {
        const decrypted = AES.decrypt(data, cryptoConfig.key)
        return decrypted.toString(enc.Utf8)
    }
}

let crypto = new Crypto()

export { crypto }
