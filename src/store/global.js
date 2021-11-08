import { atom } from "recoil"

export const activeBreakpointState = atom({
   key: 'activeBreakpoint',
   default: ''
})

export const isNotMobileState = atom({
   key: 'isNotMobile',
   default: ''
})