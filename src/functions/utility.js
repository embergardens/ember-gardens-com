/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
export const randomize = ( list ) => list[ Math.floor( ( Math.random() * list.length ) ) ]

export const focusableElements = () => [
   "a[href]",
   "area[href]",
   'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
   "select:not([disabled]):not([aria-hidden])",
   "textarea:not([disabled]):not([aria-hidden])",
   "button:not([disabled]):not([aria-hidden])",
   "iframe",
   "object",
   "embed",
   "[contenteditable]",
   '[tabindex]:not([tabindex^="-"])'
]

export const waitForEl = ( selector ) => {
   return new Promise(resolve => {
      if (document.querySelector(selector)) {
         return resolve(document.querySelector(selector))
      }

      const observer = new MutationObserver(mutations => {
         if (document.querySelector(selector)) {
            resolve(document.querySelector(selector))
            observer.disconnect()
         }
      })

      observer.observe(document.body, {
         childList: true,
         subtree: true
      })
   })
}