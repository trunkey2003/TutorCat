# TutorCat Template
##### Using for WebDev Adventure 2022. Based on Next.js and Tailwind, DaisyUI
From sheroanh with Love ❤️

## Instruction manual
#### Before using
You need install all packages in package.json:
- Via **npm**: `npm install`
- Via **yarn**: `yarn`

#### Development 
- Via **npm**: `npm dev`
- Via **yarn**: `yarn dev`

#### Production
Firstly, building all things before starting:
- Via **npm**: `npm build`
- Via **yarn**: `yarn build`

And then:
- Via **npm**: `npm start`
- Via **yarn**: `yarn start`


## [IMPORTANT] Directory tree and notes

```base
├── @meowmeow\
│   │
│   ├── authentication\
│   │   │
│   │   ├── auth-methods\
│   │   │   │
│   │   │   └── jwt-auth\
│   │   │       │
│   │   │       ├── dist\
│   │   │       │   └── config.dev.js
│   │   │       │
│   │   │       ├── config.js
│   │   │       └── index.js
│   │   │
│   │   │
│   │   ├── auth-page-wrappers\
│   │   │   ├── AuthPage.js
│   │   │   └── SecurePage.js
│   │   │
│   │   └── index.js
│   │
│   ├── components\
│   │   │
│   │   ├── Badge\
│   │   │   └── index.js
│   │   │
│   │   ├── Header\
│   │   │   │
│   │   │   ├── Menu\
│   │   │   │   ├── config.js // Config menu here
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── fullPage\
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── withSidebar\
│   │   │       └── index.js
│   │   │
│   │   │
│   │   ├── LanguageSwitcher\
│   │   │   └── index.js
│   │   │
│   │   ├── Layout\
│   │   │   ├── Auth.js // Layout with Header only
│   │   │   └── Forum.js // Layout with Sidebar and Header
│   │   │
│   │   ├── Loading\
│   │   │   └── index.js
│   │   │
│   │   ├── Modal\
│   │   │   └── index.js
│   │   │
│   │   ├── PageComponents\
│   │   │   └── PageLoader.js
│   │   │
│   │   ├── ProfileGroup\
│   │   │   │
│   │   │   ├── Menu\
│   │   │   │   ├── config.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── QuestionDetail\
│   │   │   └── index.js
│   │   │
│   │   ├── QuestionNew\
│   │   │   └── index.js
│   │   │
│   │   └── auth\
│   │       ├── SignIn.js
│   │       └── SignUp.js
│   │
│   │
│   ├── modules\
│   │
│   ├── redux\
│   │   │
│   │   ├── actions\
│   │   │   └── lang.js
│   │   │
│   │   └── reducers\
│   │       ├── index.js
│   │       └── lang.js
│   │
│   │
│   ├── styles\
│   │   ├── global.css
│   │   ├── style.css // Adding your styles here
│   │   └── tailwind.css
│   │
│   └── utils\
│       │
│       ├── i18n\
│       │   │
│       │   ├── dist\
│       │   │   └── index.dev.js
│       │   │
│       │   ├── entries\
│       │   │   ├── en-US.js
│       │   │   └── vi-VN.js
│       │   │
│       │   ├── locales\ // Adding new messages match with Eng and Vie
│       │   │   ├── en_US.json
│       │   │   └── vi_VN.json
│       │   │   
│       │   │
│       │   ├── index.js
│       │   └── index.js.bak
│       │
│       ├── IntlMessages.js // Module use for multilanguage
│       └── LangConfig.js
│
│
├── pages\ // Creating new pages here
│   │
│   ├── account\
│   │   ├── signin.js
│   │   └── signup.js
│   │
│   ├── questions\
│   │   ├── [qid].js
│   │   ├── index.js
│   │   └── new.js
│   │
│   ├── _app.js
│   ├── explorer.js
│   └── index.js
│
├── public\
│   │
│   ├── vendor\
│   │   └── languageSwitcher.svg
│   │
│   └── favicon.ico
│
├── README.md
├── package-lock.json
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

