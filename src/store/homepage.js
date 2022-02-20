import { atom } from "recoil"

export const introVideoLoadedState = atom({
   key: 'introVideoLoadedState',
   default: false
})

export const introVideoFinishedState = atom({
   key: 'introVideoFinishedState',
   default: false
})

export const loopVideoLoadedState = atom({
   key: 'loopVideoLoadedState',
   default: false
})

export const gatewayPassedState = atom({
   key: 'gatewayPassedState',
   default: false
})
