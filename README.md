# Zadanie Retail24

Projekt frontendowy zbudowany z wykorzystaniem najnowszych technologii:

## 🚀 Technologie

- **React 19** - Najnowsza wersja React z nowymi funkcjonalnościami
- **TypeScript** - Typowanie statyczne dla lepszego DX
- **Vite** - Szybki bundler i dev server
- **ESLint** - Linting kodu
- **CSS Modules** - Lokalne style

## 📦 Instalacja

```bash
npm install
```

## 🛠️ Skrypty

```bash
# Uruchomienie serwera deweloperskiego
npm run dev

# Budowanie projektu
npm run build

# Podgląd zbudowanego projektu
npm run preview

# Linting kodu
npm run lint

# Testy
npm run test          # Uruchom testy w trybie watch
npm run test:run      # Uruchom testy jednorazowo
npm run test:ui       # Uruchom testy z UI
npm run test:coverage # Uruchom testy z pokryciem

# Formatowanie
npm run format        # Formatuj kod
npm run format:check  # Sprawdź formatowanie
```

## 🏗️ Struktura projektu

```
src/
├── assets/          # Statyczne zasoby (obrazy, ikony)
├── components/      # Komponenty React
├── hooks/          # Custom hooks
├── types/          # Definicje TypeScript
├── utils/          # Funkcje pomocnicze
├── App.tsx         # Główny komponent aplikacji
├── main.tsx        # Punkt wejścia aplikacji
└── index.css       # Globalne style
```

## 🎯 Funkcjonalności

- [x] Komponenty z TypeScript
- [x] Responsywny design z Tailwind CSS
- [x] Modern UI/UX
- [x] Optymalizacja wydajności
- [x] Testy jednostkowe z Vitest
- [x] Automatyczne formatowanie z Prettier
- [x] Git hooks z Husky
- [x] Konwencje commitów z commitlint

## 🔧 Konfiguracja

Projekt używa:

- **Vite** jako bundler
- **TypeScript** dla typowania
- **Tailwind CSS 3.4** dla stylowania
- **ESLint + Prettier** dla jakości kodu
- **Vitest** dla testów unitowych
- **Husky** dla Git hooks
- **lint-staged** dla automatycznego formatowania
- **commitlint** dla konwencji commitów

## 📝 Konwencje Commitów

Projekt używa [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Przykłady poprawnych commitów:
feat: dodaj nowy komponent Button
fix: napraw błąd w walidacji formularza
docs: zaktualizuj README
style: popraw formatowanie kodu
refactor: refaktoryzuj logikę komponentu
test: dodaj testy dla hooka useLocalStorage
chore: zaktualizuj zależności
```

**Typy commitów:**

- `feat` - Nowa funkcjonalność
- `fix` - Poprawka błędu
- `docs` - Zmiany w dokumentacji
- `style` - Zmiany formatowania
- `refactor` - Refaktoryzacja kodu
- `perf` - Poprawki wydajności
- `test` - Dodanie lub poprawka testów
- `chore` - Zmiany w build process, narzędziach
- `ci` - Zmiany w CI/CD
- `revert` - Cofnięcie poprzedniego commita
- `build` - Zmiany w systemie build
- `wip` - Work in progress

## 📝 Licencja

MIT
