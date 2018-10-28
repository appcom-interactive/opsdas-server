/* eslint-disable no-underscore-dangle */

module.exports = [{
  type: 'input',
  validate: answer => answer.length > 0,
  name: 'listen.web-ui',
  message: 'On which port should the web ui run',
  default: () => '8080'
}, {
  type: 'input',
  validate: answer => answer.length > 0,
  name: 'listen.agent-metrics',
  message: 'On which UDP port should the server listen to agent metrics',
  default: () => '6273'
}, {
  type: 'input',
  validate: answer => answer.length > 0,
  name: 'listen.agent-data',
  message: 'On which TCP port should the server listen to agent data',
  default: () => '6273'
}, {
  type: 'confirm',
  name: '_emailEnabled',
  message: 'Should opsdash send emails',
  default: () => true
}, {
  type: 'input',
  validate: answer => answer.length > 0,
  name: 'email.smtpserver',
  message: 'What is the email stmp server',
  when: answers => answers._emailEnabled
}, {
  type: 'input',
  validate: answer => answer.length > 0,
  name: 'email.username',
  message: 'What is the email username',
  when: answers => answers._emailEnabled
}, {
  type: 'password',
  name: 'email.password',
  mask: '*',
  message: 'What is the email password',
  when: answers => answers._emailEnabled
}, {
  type: 'input',
  validate: answer => answer.length > 0,
  name: 'email.from',
  message: 'What is the email from address, which is shown to the recipients',
  when: answers => answers._emailEnabled
}, {
  type: 'confirm',
  name: 'email.tlswrapper',
  message: 'Should TLS wrapping be enabled',
  when: answers => answers._emailEnabled
}, {
  type: 'input',
  name: 'email.maxfreq',
  message: 'What is the frequency in minutes in which emails are sent',
  default: () => 5,
  when: answers => answers._emailEnabled
}, {
  type: 'input',
  name: 'retention',
  message: 'Who many days should data be retained',
  default: () => 60
}, {
  type: 'confirm',
  name: 'debug',
  message: 'Should the server run in debug mode',
  default: () => false
}];
