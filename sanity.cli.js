import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3r8wb2ev',
    dataset: 'production',
  },
  studioHost: 'bunyala-agriclimate',
  deployment: { autoUpdates: true },
})
