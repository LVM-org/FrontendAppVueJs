# FrontendAppVueJs


This project extends VueCLI default typescript template. The goal is to provide a quick and simple vuejs template that includes the common plugins and folder structure needed to build a single-page app of any size or requirement. This allows you to spend less time on project setup and more time on the business logic of the application.


## Features

This template includes the following features out of the box: 
- Automatic Route Discovery (similar to NuxtJS) 
- Vue-meta integration 
- TailwindCSS integration (Optional)
- An organized folder structure.


## Usage

Clone the repository into a new folder (e.g "my-app")
```
git clone https://github.com/LVM-org/FrontendAppVueJs.git .
```
Change directory
```
cd my-app
```
Install app modules
```
npm install
```

Start VueCLI server
```
npm run serve
```

## Project Folders
The project folders are explained in more detail below..
 
### /public
This folder contains your project assets that must be exposed to the public. These can be images, CSS, or script files, among other things.

### /src
This folder contains the entire codebase for your project. You can add new folders here to expand the project folder structure.

### /src/main.ts
This file is the entry point for your app. It is where you import and configure your UI Components and Frontend Logic packages. 

#### Configure Frontend Logic

To get started, import the `Logic` variable from the package. Next, register the `Logic.Common.preFetchRouteData` method as global middleware so the package can take care of data prefetching. Set the `router` and `route` in the Logic package so it can handle routing on behalf of the application. Finally, set the backend `API URL`.

```ts
/src/main.ts

import { Logic } from 'app-logic'


const router = Promise.all(routes).then((routes) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach((to, from, next) => {
    const toRouter: any = to
    const fromRouter: any = from
    // setup middlewares using the logic package
    return Logic.Common.preFetchRouteData(toRouter, next, fromRouter) 
  })

  return router
})

const init = async () => {
  createApp({
    components: {
      App,
    },
    setup() {
      const router: any = useRouter()
      const route: any = useRoute()

      // setup logic route and routers
      Logic.Common.SetRouter(router)
      Logic.Common.SetRoute(route)

      // Setup backend api url
      Logic.Common.SetApiUrl(process.env.VUE_APP_API_URL || '')

      ....
    },
  })
    .component('dashboard-layout', DashboardLayout)
    .use(await router)
    .use(store, key)
    .use(createMetaManager())
    .mount('#app')
}

init()
```

#### Configure UI Component
First, import `SetFrontendLogic` from the package, and use it to inject the frontend logic instance into UI Component. The reason this is done is to ensure that only one instance of the `Frontend Logic` is initiated during the life cycle of the application.

```ts
/src/main.ts

import { SetFrontendLogic } from 'app-ui-components'


// UI component css style
import 'app-ui-components/dist/library.min.css'

const init = async () => {
  createApp({
    components: {
      App,
    },
    setup() {
       ...
      // set ui frontend logic
      SetFrontendLogic(Logic)
       ... 
    },
  })
    .component('dashboard-layout', DashboardLayout)
    .use(await router)
    .use(store, key)
    .use(createMetaManager())
    .mount('#app')
}

init()

```

#### Connecting the Frontend Logic reactivity to VueJs reactivity.
The initiated instance of the `Fronend Logic`, runs outside of Vue's reactivity system. So changes to properties in the Logic do not get detected in the Vue App. To address this, the `watchProperty()` method available on all Modules in the Logic, enables you to connect or link a Vue reactive variable to a property in a Frontend Logic module, as shown below.

```
import { Logic } from 'app-logic'


export default defineComponent({
  components: {},
  setup() {

      // initiate vue reactive variable
     const AuthUser = ref(Logic.Auth.AuthUser)

     // Connect the reactive variable to the Logic property - AuthUser on component mount
      onMounted(() => {
        Logic.Auth.watchProperty("AuthUser", AuthUser)
      })

      // Now the variable AuthUser will get updated anytime the property - AuthUser - changes
      watch(AuthUser, () => {
         console.log('I changed', AuthUser.value)
      })

    return {};
  },
});
```

### /src/assets

This section contains assets that are only intended for internal use. These are assets that you want to import into your codebase, such as raw JSON files, build scripts, or CSS files.

### /src/common

The common folder contains scripts that hold global variables that will be used throughout your app. Constant variables for your.env files, for example (such as APP NAME, API KEY, EVN TYPE, and so on) can be parsed and exposed from there.

```ts
export const API_URL = "";
export const RESOURCES_URL = "";
export const APP_URL = "";
```
### /src/components

The component folder looks similar to VueCLI's. It contains your project's components file. You can make separate folders for each domain of your application.
For example, if you are developing an e-commerce app, you should create separate folders for  User, Products, and so on. You can also include a "common" folder that contains components used throughout your application, such as form components like text fields and buttons.


### /src/layouts

Layouts allow you to create multiple layout systems throughout your app. You can have a "Auth" layout for your authentication pages (Login, Register, Forgot Password, and so on), and a "Dashboard" layout for the rest of your application's pages.
The default layout for this project is implemented in 'AppLayoutDefault.vue'. Any page that does not specify a layout inherits this layout.

#### Create a new layout

To make a new layout, place a new file in the layout folder, such as "Sample," and insert `<slot/>` where you want your page data to appear.

```vue
<template>
  <div>
    <!-- Your are free to design the layout to fit your appication -->
    <h2>From Sample Layout</h2>
    <!-- Your page content would be inserted here -->
    <slot />
  </div>
</template>
```


#### Registering a layout
To register a layout, add it as a global component in the `main.ts` file
```ts
/src/main.ts

import DashboardLayout from './layouts/Dashboard.vue'

const init = async () => {
  createApp({
    components: {
      App,
    },
    setup() {
      const router: any = useRouter()
      const route: any = useRoute()

       ....
    },
  })
    .component('dashboard-layout', DashboardLayout)
    .use(await router)
    .use(store, key)
    .use(createMetaManager())
    .mount('#app')
}
...
```

#### Use a layout
To use a layout, wrap the component it around your page.
```vue
<template>
  <dashboard-layout>
    <h1>This is the sample index page</h1>
  </dashboard-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMeta } from "vue-meta";
export default defineComponent({
  name: "SampleIndexPage",
  setup() {
    useMeta({
      title: "Sample Index Page",
    });
    return {};
  },
});
</script>
```


### /scr/modules

This folder contains your application's "Types" definition. Depending on the size of your project, each domain may have a single file containing all of its type definitions, or a folder containing all of the different type definition files for that domain. Here's an example of a file containing a type definition.
```ts
export type SampleModel = {
  var1: string;
  var2: number[];
};
```

### /src/router

These projects handle routing automatically. The source code for this is contained in the folder. The automatic routing is dependent on the "views" folder and handles routing similarly to NuxtJS. The 'index.vue' file in the views folder is the default (home) route, while all other folders in the file become sub-routes. The routing system also supports dynamic routing. Please read more about how the routing works [here](https://itnext.io/vue-tricks-smart-router-for-vuejs-93c287f46b50).



### /src/composable

The VueJs composition API is used by default in this project. This folder contains your application's business logic. For larger apps, you can create new folders for each of your app domains, or for smaller ones, you can create a single file to hold your business logic for each domain. Here's an example:
```ts
// sample.ts
import { SampleModel } from "./../modules/sample";
import { $api } from "@/services/api";
import { ref } from "vue";

const sampleApiData = ref<SampleModel>();

// sanple get request
const sampleGetRequest = (resourceId: string): void => {
  $api.sample.get(resourceId).then((response) => {
    sampleApiData.value = response.data;
  });
};

// sample fetch
const sampleFetchRequest = (): void => {
  $api.sample.fetch().then((response) => {
    console.log(response);
  });
};

// sample search
const sampleSearchRequest = (query: string): void => {
  $api.sample.search(query).then((response) => {
    console.log(response);
  });
};

// sample post

// This will only work if the sampleApiService extends the ModelService
// The ModelService is for read and write(Post, Put, Delete) api requests

// const samplePostRequest = (data = {}) => {
//   $api.sample.post(data).then((response) => {
//     console.log(response);
//   });
// };

export const useSample = {
  sampleGetRequest,
  sampleFetchRequest,
  sampleSearchRequest,
};
```

### /src/store

This folder is where you keep track of the state of your application. By default, this project uses vue-store. However, you can switch to Pinia, which is the recommended state management package for Vue 3.

### /src/views

This folder houses all of your app pages. 
> Because the route discovery system relies on the component name to properly route the page, each page must have a unique name.


### /src/App.vue
This is the most important part of your application. In most cases, no changes to the file are required.

### /src/main.ts
This is your Vue application's entry point. You can remove or add new global plugins to your application from this file.


## Happy Building!
