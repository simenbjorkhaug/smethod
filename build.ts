import { build, emptyDir } from 'https://deno.land/x/dnt@0.38.1/mod.ts'

await emptyDir('./npm')

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  typeCheck: false,
  package: {
    // package.json properties
    name: '@bjorkhaug/smethod',
    version: Deno.args[0],
    description:
      'Simple route deocrators for Deno to populate class methods with metadata for routing',
    license: 'MIT',
    publishConfig: {
      access: 'public',
      registry: 'https://registry.npmjs.org/',
      scope: '@bjorkhaug',
    },
    peerDependencies: {
      '@bjorkhaug/sreflect': '^0.0.2',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/simenbjorkhaug/smethod.git',
    },
    bugs: {
      url: 'https://github.com/simenbjorkhaug/smethod/issues',
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync('README.md', 'npm/README.md')
  },
})
