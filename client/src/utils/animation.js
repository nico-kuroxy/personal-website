/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines all the javascript animations used throughout this project.
/**********************************************************************************************************************/

// Animation declaration.
export const slideUp = {
    hidden: { y: '100%' },             // Start below the screen
    visible: { y: '0%', transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { y: '100%', transition: { duration: 0.4, ease: 'easeIn' } }
}