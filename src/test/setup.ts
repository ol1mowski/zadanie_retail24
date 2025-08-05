import '@testing-library/jest-dom'
import { afterEach, beforeEach } from 'vitest'

// Globalne ustawienia dla testów
beforeEach(() => {
    // Reset DOM przed każdym testem
    document.body.innerHTML = ''
})

afterEach(() => {
    // Cleanup po każdym teście
    document.body.innerHTML = ''
}) 