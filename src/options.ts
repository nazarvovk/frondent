export type Framework = {
  name: string
  cliList: CliTool[]
}
export type CliTool = {
  name: string
  command: string
}

const npx = (command: string) => `npx ${command}`

export const FRAMEWORKS: Record<string, Framework> = {
  REACT: {
    name: 'React',
    cliList: [
      {
        name: 'Create React App',
        command: npx('create-react-app'),
      },
      {
        name: 'Remix',
        command: npx('create-remix'),
      },
      {
        name: 'Next (JavaScript)',
        command: npx('create-next-app'),
      },
      {
        name: 'Next (TypeScript)',
        command: npx('create-next-app --ts'),
      },
      {
        name: 'Gatsby',
        command: npx('gatsby new'),
      },
      {
        name: 'Razzle',
        command: npx('create-razzle-app'),
      },
    ],
  },
  VUE: {
    name: 'Vue.js',
    cliList: [
      {
        name: 'Vue (vue create)',
        command: npx('-p @vue/cli -p @vue/cli-service-global vue create'),
      },
      {
        name: 'Nuxt',
        command: npx('create-nuxt-app'),
      },
      {
        name: 'Gridsome',
        command: npx('-p @gridsome/cli gridsome create'),
      },
      {
        name: 'VuePress',
        command: npx('create-vuepress-site'),
      },
    ],
  },
  ANGULAR: {
    name: 'Angular',
    cliList: [
      {
        name: 'Angular (ng new)',
        command: npx('-p @angular/cli@8 ng new'),
      },
    ],
  },
  SVELTE: {
    name: 'Svelte',
    cliList: [
      {
        name: 'SvelteKit',
        command: npx('create-svelte'),
      },
      {
        name: 'Elder.js',
        command: npx('degit Elderjs/template'),
      },
    ],
  },
}

export const ALL_CLI_TOOLS = Object.values(FRAMEWORKS)
  .map((f) => f.cliList)
  .flat()
