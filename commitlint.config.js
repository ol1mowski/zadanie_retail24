export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nowa funkcjonalność
        'fix', // Poprawka błędu
        'docs', // Zmiany w dokumentacji
        'style', // Zmiany formatowania (nie wpływają na kod)
        'refactor', // Refaktoryzacja kodu
        'perf', // Poprawki wydajności
        'test', // Dodanie lub poprawka testów
        'chore', // Zmiany w build process, narzędziach, itp.
        'ci', // Zmiany w CI/CD
        'revert', // Cofnięcie poprzedniego commita
        'build', // Zmiany w systemie build
        'wip', // Work in progress
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
