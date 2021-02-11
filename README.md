[comment]: <> (modifie this, do not remove)
<!-- [![Actions Status](https://github.com/{owner}/{repo}/workflows/{workflow_name}/badge.svg)](https://github.com/{owner}/{repo}/actions) -->
[![Actions Status](https://github.com/BHC-IT/node-cpp-template/workflows/Node.js%20CI/badge.svg)](https://github.com/BHC-IT/node-cpp-template/actions)
[![Actions Status](https://github.com/BHC-IT/node-cpp-template/workflows/tslint/badge.svg)](https://github.com/BHC-IT/node-cpp-template/actions)
[![Actions Status](https://github.com/BHC-IT/node-cpp-template/workflows/cpplint/badge.svg)](https://github.com/BHC-IT/node-cpp-template/actions)

# Project tree
```
 WASM
├── addon //contain .cpp & .h files
│   ├── base.cpp -> base() function
│   ├── base.h -> export base() to global scope
│   └── index.cpp -> expose base() function for nodejs via napi
├── bindings //contain .ts file that wrap from cpp
│   └── base.ts -> wrap base addon for as a ts module
├── scripts // scripts to use the project
│   ├── build.sh -> build the cpp files of the project
│   ├── createDocker.sh -> create docker image of the project
│   ├── runDocker.sh -> create container based on current image
│   ├── runTestDocker.sh -> create container of a test image and destroy it after used
│   └── testDocker.sh -> create test image
├── src // source file for the project in .ts
│   └── index.ts -> entry point of the bundle
├── test // unitary test
│   ├── base.cpp.test.ts -> test for base() funtion
│   └── index.test.ts -> test of the entrypoint
├── typings // type test file
│   ├── globals
│   │   └── mocha
│   │       ├── index.d.ts
│   │       └── typings.json
│   ├── index.d.ts
│   └── modules
│       └── chai
│           ├── index.d.ts
│           └── typings.json
├── binding.gyp -> configuration file for node-gyp
├── Dockerfile -> docker configuration file used for creating the project image
├── Dockerfile.test -> docker configuration file used for creating the test image
├── nodemon.json -> configuration file for nodemon
├── package.json -> configuration file for npm
├── README.md
├── tsconfig.json -> configuration file for typescript
└── typings.json -> configuration file for typing

```

# Command
`npm start`: run the project in prod mode

`npm run dev`: run the project in dev mode with nodemon

`npm run build`: build the project. run ./scripts/build.sh

`npm run clean`: clear the project. delete `dist` && `build` path

`npm run test`: launch unary test

`npm run docker`: create a docker image of the project. same as `npm run docker:build`. run ./scripts/createDocker.sh

`npm run docker:start`: launch a docker container based on the current version image if it exist run ./scripts/runDocker.sh

`npm run docker:test`: create a docker image for unite testing purpose. create a self destructing attached container of the image. run ./scripts/testDocker.sh and ./scripts/runTestDocker.sh

# Dependecies
```bash
npm install -g typings chai mocha ts-node node-gyp
```

lets break that down:

	`typing & chain & mocka` : unitary tests

	`ts-node`: compile typescript code

	`node-gyp`: compile C++ code

# How to use

First clone this repo and copy/move its content in another project folder
```bash
git clone https://github.com/BHC-IT/node-cpp-template.git
mkdir NEW_PROJECT
cp -rf node-cpp-template/* NEW_PROJECT/.
```

then link the folder to your remote repository
```bash
cd NEW_PROJECT
git init
git commit -m "first commit"
git remote add origin git@github.com:AUTHOR_NAME/REPO_NAME.git
git push -u origin master
```
You are now good to go with this template