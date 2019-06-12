export default () => ({
  pending: false,
  ID: null,
  cookies: null,
  uniques: null,
  isChrome: false,
  extensionInstalled: false,
  extensionId: process.env.EXTENSION_ID,
  timeOut: true,
  sequence: false,
  turned: false,
  sideTexts: {
    connected:
      'In the top layer all of the websites you have visisted, since the instalation of the plugin, are listed. Companies are interested to see your overall behaviour online. They want to have access to more than one website, so they can built a more complete profile. This layer shows all websites you have visited since installing the plugin. However, it will higlight all the websites that are accessible by companies that have access to the webiste you selected to inspect in the bottom layer.',
    companies:
      'Companies are the initiators to collect data about individuals browsing the web, using the cookie technique and related network. Mostly, the data is used for advertising purposes. Which means that profiles are build around any individual browsing the internet. Several examples have shown, however, that the data are also used for other purposes, such as influencing democratic voting processes. Next to this, it has also been shown that companies don’t take their security measures too serious. Resulting in data leaks and access to very sensitive and detailed profiles to be used by anyone with malicious intent. This layers lists all the companies present in your cookie network. When you select a website to inspect, the companies that have access will be shown. All connections belonging to one company have a distinct color.',
    domains:
      'A domain has a registration in a public registrar. The registration includes a location and an owner. This information is used to connect domains to countries and companies. The country is important to know, as different countries have different laws and regulations on privacy and the usage of data obtained through cookies. The companies are important to know, as they can register multiple domains. At a first glance these domains might not be connected at all, but the data will end up at one large collector. Companies can use several domains to hide their true identity. When you select a website to inspect, you can see behind what domains companies are trying to hide their identity.',
    subdomains:
      'Sub-domains fulfill the role of logistic center. Where a domain has a registration including a location and owner, sub-domains are linked to their domain. By setting up multiple sub-domains, it is easier to manage the data flows coming from the cookies. You can create different channels, making it easier to distinguish between types of data. When you inspect a website you can see the vast number of subdomains usualy used to streamline the flow of data from you to the companies several layers up.',
    cookies: `Cookies are the starting point for the creation of the cookie network. A network of connections built by companies to track your online behaviour. But what is a cookie exactly? A cookie is a standard format with one unique ingredient. That unique ingredient is you. By assigning a unique value to the cookie, your signature so to say, it is possible for companies to combine all the data coming from one cookie together. A cookie is a static file that is placed in your device and it needs you in order to become valuable, it needs your signature.`,
    visited:
      'A list of all the websites you have visited since installing the plugin. You can select a website to inspect and see where your data ends up and what other websites you have used are also within reach of the companies using the selected webste to collect data on you.'
  }
})
