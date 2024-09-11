import axios from 'axios'

const messageTriggerHub = axios.create({
    baseURL: process.env.MESSEGE_TRIGGER_HUB_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MESSEGE_TRIGGER_HUB_TOKEN}`
    },
})

export { messageTriggerHub }