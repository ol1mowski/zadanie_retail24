# Aplikacja Stoperów

Nowoczesna aplikacja do zarządzania stoperami odliczającymi czas do ważnych wydarzeń, zbudowana w React 19 + TypeScript.

## 🚀 Technologie

- **React 19** - Najnowsza wersja biblioteki React
- **TypeScript** - Statyczne typowanie
- **Vite** - Szybki bundler i dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - Przetwarzanie CSS
- **Autoprefixer** - Automatyczne dodawanie vendor prefixes
- **Vitest** - Framework testowy
- **@testing-library/react** - Testowanie komponentów React
- **Husky** - Git hooks
- **lint-staged** - Uruchamianie linterów na staged files
- **commitlint** - Walidacja commit messages
- **ESLint** - Linter JavaScript/TypeScript
- **Prettier** - Formatter kodu

## 📦 Instalacja

```bash
npm install
```

## 🛠️ Skrypty

### Development

```bash
npm run dev          # Uruchomienie dev servera
npm run build        # Build produkcyjny
npm run preview      # Podgląd builda
```

### Testy

```bash
npm run test         # Uruchomienie testów w trybie watch
npm run test:run     # Jednorazowe uruchomienie testów
npm run test:ui      # UI dla testów
npm run test:coverage # Testy z pokryciem
```

### Code Quality

```bash
npm run lint         # ESLint
npm run format       # Prettier format
npm run format:check # Sprawdzenie formatowania
npm run type-check   # Sprawdzenie typów TypeScript
```

## 🏗️ Struktura Projektu

```
src/
├── components/          # Komponenty React
│   ├── StopwatchApp.component.tsx      # Główny komponent aplikacji
│   ├── StopwatchGrid.component.tsx     # Siatka stoperów
│   ├── StopwatchItem.component.tsx     # Pojedynczy stoper
│   └── AddStopwatchModal.component.tsx # Modal dodawania stopera
├── types/              # Definicje typów TypeScript
│   └── stopwatch.ts    # Typy dla stoperów
├── utils/              # Funkcje pomocnicze
│   └── stopwatch.utils.ts # Utility functions
├── test/               # Konfiguracja testów
│   └── setup.ts        # Setup dla testów
├── App.tsx             # Główny komponent
├── main.tsx            # Entry point
└── index.css           # Globalne style
```

## ⏰ Funkcjonalności

### ✅ Zaimplementowane

- [x] Wyświetlanie listy stoperów w układzie 3 kolumn
- [x] Dodawanie nowych stoperów z nazwą i datą docelową
- [x] Usuwanie stoperów
- [x] Wstrzymywanie/wznawianie stoperów
- [x] Odliczanie czasu co do milisekundy
- [x] Responsywny design (mobile, tablet, desktop)
- [x] Statystyki stoperów (aktywne, wstrzymane, ukończone)
- [x] Walidacja formularzy
- [x] Modal dodawania stoperów
- [x] Komunikaty o ukończeniu stoperów
- [x] Przykładowe dane do testowania UI

### 🔄 W trakcie implementacji

- [ ] Przechowywanie w Cookies
- [ ] Export/import stoperów przez linki
- [ ] Persystencja danych po zamknięciu przeglądarki

## 🎨 Design

Aplikacja wykorzystuje:

- **Kolory**: Biały i niebieski (zgodnie z wymaganiami)
- **Layout**: Grid 3 kolumny na desktop, 2 na tablet, 1 na mobile
- **Responsywność**: Pełna adaptacja do różnych rozmiarów ekranów
- **UX**: Intuicyjny interfejs z animacjami i przejściami

## 🧪 Testy

Aplikacja zawiera testy jednostkowe dla:

- Głównego komponentu aplikacji
- Renderowania UI
- Interakcji użytkownika

## 📝 Konwencje Commitów

Projekt używa [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nowe funkcjonalności
- `fix:` - Poprawki błędów
- `docs:` - Zmiany w dokumentacji
- `style:` - Zmiany formatowania
- `refactor:` - Refaktoryzacja kodu
- `test:` - Dodawanie/zmiany testów
- `chore:` - Zmiany w build process, dependencies

## 🔧 Konfiguracja

### Git Hooks (Husky)

- `pre-commit`: Uruchamia lint-staged (ESLint + Prettier)
- `commit-msg`: Waliduje format commit message
- `pre-push`: Uruchamia testy przed push

### ESLint

- Konfiguracja dla React + TypeScript
- Reguły dla najlepszych praktyk

### Prettier

- Automatyczne formatowanie kodu
- Spójny styl w całym projekcie

## 🚀 Deployment

Aplikacja jest gotowa do deploymentu:

```bash
npm run build
```

Pliki produkcyjne znajdują się w katalogu `dist/`.

## 📄 Licencja

MIT
