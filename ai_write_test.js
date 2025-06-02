Feature('ai')
Scenario.only('test ai features', ({ I }) => {
  I.amOnPage('https://getbootstrap.com/docs/5.2/examples/checkout/')
  pause()
})