export default () => ({
  pending: false,
  ID: null,
  cookies: null,
  uniques: null,
  isChrome: false,
  extensionInstalled: false,
  extensionId: process.env.EXTENSION_ID,
  timeOut: false,
  sequence: false,
  sideTexts: {
    connected:
      'In the top layer all of the websites you have visisted, since the instalation of the plugin, are listed. This layer shows to what other websites you have visited companies have access to.',
    companies:
      'This layers listsb all the companies present in your cookie network. When you select a website to inspect, the companies that have access will be shown. All connections belonging to one company have a distinct color',
    domains:
      'Companies can use several domains to hide their true identity. When you select a website to inspect, you can see behind what domains companies are trying to hide their identity.',
    subdomains:
      'Subdomains are the logistic centers in the network. They make it easy to channel and group data from cookies. This makes it easier in the end to process and use the data. When you inspect a website you can see the vast number of subdomains usualy used to streamline the flow of data from you to the companies, several layers up.',
    cookies: 'Cookies are small text files on you computer',
    visited:
      'A list of all the websites you have visited since installing the plugin. You can select a website to inspect and see where your data ends up and what other websites you have used are also within reach of the companies using the selected webste to collect data on you.'
  }
})
