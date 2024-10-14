module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testMatch: ['**/tests/unit/**/*.spec.[jt]s?(x)'],
  testEnvironment: 'jsdom', // Voeg dit toe als je een DOM-gebaseerde omgeving nodig hebt voor Vue.js componenten
};
