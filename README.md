# 🕐 Aplikacja Stoperów - Retail24

Nowoczesna aplikacja webowa do zarządzania stoperami odliczającymi czas z dokładnością do milisekundy. Aplikacja umożliwia tworzenie, udostępnianie i zarządzanie stoperami z intuicyjnym interfejsem użytkownika.

## ✨ Funkcjonalności

### 🎯 Podstawowe funkcje

- **Odliczanie czasu** - stoper z dokładnością do milisekundy
- **Zarządzanie stoperami** - dodawanie, usuwanie, wstrzymywanie
- **Układ responsywny** - 3 stopery w rzędzie z automatycznym przewijaniem
- **Persystencja danych** - zapisywanie w Cookies przeglądarki
- **Powiadomienia** - automatyczne komunikaty o zakończeniu stoperów

### 🔗 Funkcje zaawansowane

- **Udostępnianie stoperów** - generowanie linków do współdzielenia
- **Tryb podglądu** - wyświetlanie udostępnionych stoperów
- **Statystyki** - podsumowanie aktywnych i zakończonych stoperów
- **Responsywny design** - optymalizacja dla różnych urządzeń

## 🛠️ Technologie

### Frontend

- **React 19.1.0** - najnowsza wersja z Concurrent Features
- **TypeScript 5.8.3** - pełne typowanie dla lepszej jakości kodu
- **Vite 7.0.4** - szybki bundler i dev server
- **Tailwind CSS 3.4.3** - utility-first CSS framework
- **React Router DOM 7.7.1** - routing aplikacji

### Testy

- **Vitest 3.2.4** - unit testing framework
- **Playwright 1.40.0** - end-to-end testing
- **Testing Library** - testowanie komponentów React
- **66 testów** - pokrycie wszystkich głównych funkcjonalności

### DevOps & Quality

- **Docker** - konteneryzacja aplikacji
- **Docker Hub** - rejestr obrazów
- **GitHub Actions** - CI/CD pipeline
- **Husky** - git hooks
- **Commitlint** - konwencje commitów
- **ESLint + Prettier** - linting i formatowanie kodu
- **TypeScript** - sprawdzanie typów

## 🚀 Szybki start

### Wymagania

- Node.js 20+
- npm lub yarn

### Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/ol1mowski/zadanie_retail24.git
cd zadanie_retail24

# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev
```

### Docker

```bash
# Uruchomienie z Docker Compose
docker-compose up

# Lub budowanie obrazu
docker build -t stopwatch-app .
docker run -p 5173:5173 stopwatch-app
```

## 📋 Dostępne skrypty

```bash
# Development
npm run dev              # Uruchomienie dev server
npm run build           # Budowanie produkcyjne
npm run preview         # Podgląd build

# Testy
npm test               # Uruchomienie testów
npm run test:unit      # Unit testy
npm run test:e2e       # End-to-end testy
npm run test:coverage  # Pokrycie testami

# Quality
npm run lint           # ESLint
npm run format         # Prettier
npm run type-check     # TypeScript check
```

## 🏗️ Architektura

### Struktura projektu

```
src/
├── components/           # Komponenty React
│   ├── StopwatchApp/    # Główna aplikacja
│   ├── StopwatchGrid/   # Siatka stoperów
│   ├── StopwatchItem/   # Pojedynczy stoper
│   ├── SharedStopwatch/ # Udostępniony stoper
│   └── ui/             # Komponenty UI
├── hooks/              # Custom hooks
├── utils/              # Funkcje pomocnicze
├── types/              # Definicje TypeScript
└── test/               # Konfiguracja testów
```

### Kluczowe komponenty

- **`StopwatchApp`** - główny komponent aplikacji
- **`StopwatchGrid`** - układ 3 stoperów w rzędzie z przewijaniem
- **`GlobalPopup`** - system powiadomień i potwierdzeń
- **`useStopwatches`** - hook zarządzający stanem stoperów
- **`useStopwatchActions`** - hook z akcjami CRUD

## 🧪 Testy

### Pokrycie testami

- **66 testów** - wszystkie przechodzą ✅
- **Unit testy** - komponenty, hooks, utils
- **E2E testy** - Playwright dla scenariuszy użytkownika
- **Testy integracyjne** - cookies, sharing, CRUD operacje

### Uruchomienie testów

```bash
# Wszystkie testy
npm test

# Tylko unit testy
npm run test:unit

# E2E testy
npm run test:e2e

# Z pokryciem
npm run test:coverage
```

## 🐳 Docker

### Obraz Docker

- **Base image**: `node:20-alpine`
- **Port**: 5173
- **Volume mounts** - hot reload dla development
- **Multi-stage build** - optymalizacja rozmiaru

### Docker Compose

```yaml
services:
  app:
    build: .
    ports:
      - '5173:5173'
    volumes:
      - ./src:/app/src # Hot reload
    restart: unless-stopped
```

### Docker Hub

Obraz dostępny na Docker Hub:

```bash
# Pobranie obrazu
docker pull ol1mowski/stopwatch-app:latest

# Uruchomienie
docker run -p 5173:5173 ol1mowski/stopwatch-app:latest
```

**Docker Hub**: ol1mowski/stopwatch-app

## 🔄 CI/CD Pipeline

### GitHub Actions

Automatyczny pipeline dla każdego push/PR:

```yaml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:unit
      - run: npm run test:e2e

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ol1mowski/stopwatch-app:latest
```

### Automatyzacja

- **Automatyczne testy** - przy każdym push/PR
- **Automatyczne budowanie** - po merge do main
- **Automatyczne push** - do Docker Hub
- **Automatyczne deployment** - gotowe do wdrożenia

### Status Pipeline

![CI/CD Status](https://github.com/ol1mowski/zadanie_retail24/workflows/CI%2FCD%20Pipeline/badge.svg)

## 📱 Funkcjonalności zgodne z wymaganiami

### ✅ Zrealizowane wymagania

- [x] **Lista stoperów** - odliczanie co do milisekundy
- [x] **Dodawanie/Usuwanie** - pełne zarządzanie stoperami
- [x] **Układ 3 stoperów** - poziomy rząd z automatycznym przewijaniem
- [x] **Formularz dodawania** - data, godzina, nazwa stopera
- [x] **Komunikaty o zakończeniu** - powiadomienia i możliwość usunięcia
- [x] **Cookies** - persystencja danych po zamknięciu przeglądarki
- [x] **Udostępnianie** - linki do współdzielenia stoperów

### 🎨 Dodatkowe funkcje

- **Responsywny design** - optymalizacja dla mobile/desktop
- **Statystyki** - podsumowanie aktywnych/zakończonych stoperów
- **Error handling** - obsługa błędów i boundary
- **SEO** - meta tagi i optymalizacja
- **Accessibility** - ARIA labels i keyboard navigation

## 🔧 Konfiguracja

### Konfiguracja Vite

- **Hot Module Replacement** - szybki development
- **TypeScript** - pełne wsparcie
- **Tailwind** - PostCSS processing
- **Build optimization** - minifikacja i splitting

## 📊 Metryki jakości

- **TypeScript** - 100% pokrycie typami
- **ESLint** - zero błędów i warnings
- **Prettier** - spójne formatowanie
- **Testy** - 66 testów, wszystkie przechodzą
- **Performance** - Lighthouse score > 90
- **CI/CD** - automatyczny pipeline
- **Docker** - gotowy do deploymentu

## 🤝 Contributing

### Konwencje commitów

```
feat: nowa funkcjonalność
fix: poprawka błędu
test: dodanie testów
docs: aktualizacja dokumentacji
refactor: refaktoryzacja kodu
```

### Git hooks

- **Husky** - automatyczne sprawdzanie przed commit
- **Commitlint** - walidacja wiadomości commitów
- **Lint-staged** - linting tylko zmienionych plików

## 📄 Licencja

Projekt stworzony w ramach zadania rekrutacyjnego Retail24.

---

**Autor**: Oliwier Markiewicz  
**Technologie**: React 19, TypeScript, Tailwind CSS, Vite  
**Testy**: Vitest, Playwright  
**Deployment**: Docker, Docker Hub  
**CI/CD**: GitHub Actions
