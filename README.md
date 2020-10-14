# Install

```
npm install
```

# Luncher

```
npm run start
```

# build

```
npm run build
```

# Directory structure

```
src/
├── index.tsx // start app
├── App.tsx
├── Routes.tsx // Routing to each page settings
├── types.d.tsx // Type definition file
├── components // General purpose Component
├── atoms // recoilで使用するatoms
├── configs // configs
├── hooks // Business logic and State management 
└── pages // UI components for each Page
``` 

# Coding Rule

Since React components can be written relatively freely, we would like to reduce the cognitive load of project participants by giving a sense of unity in how to write

Reactコンポーネントは比較的自由に書けるので、書き方について統一感をもたせる事でプロジェクト参加者の認知負荷を下げたいと考えております。


## 1. Do not perform split assignment of `props`

Try to get it from props so that you can easily recognize that it is being passed from the parent component. If you want to specify the default value, use `defaultProps`.

親コンポーネントから渡されていることが認識しやすいようにpropsから取得するようにします。default値を指定したい場合は`defaultProps`を利用してください。

OK
``` Foo.tsx
export const Foo: React.FC<FooProps> = memo((props) => <div>{props.title}</div>);
```

NG
``` Foo.tsx
export const Foo: React.FC<FooProps> = memo(({ title }) => <div>{title}</div>);
```

**If you want to specify the default value**

OK
``` Foo.tsx
export const Foo: React.FC<FooProps> = memo((props) => <div>{props.title}</div>);
Foo.defaultProps = {
    title: 'default'
}
```

NG
``` Foo.tsx
export const Foo: React.FC<FooProps> = memo(({ title = 'default' }) => <div>{title}</div>);
```

## 2. memo
Memo as much as possible to avoid unnecessary re-rendering.
不要なre-renderingを避けるためにできる限りmemo化します。

``` Foo.tsx
export const Foo: React.FC<FooProps> = memo((props) => <div>{props.title}</div>));
```

NG
``` Foo.tsx
export const FooBase: React.FC<FooBaseProps> = (props) => <div>{title}</div>;
```

## 3. type is defined in the component to be used

Foo.tsx
``` Foo.tsx
type Props = {
    title: string;
    onClick: (foo: string) => void;
}
export const Foo: React.FC<Props> = memo((props) => <div>{props.title}</div>);
```

## 4. Function definition is const

OK

```
export const Foo: React.FC<Props> = memo((props) => <div>{props.title}</div>);
```

NG

```
export function Foo(props) { return <div>{props.title}</div> };
```

## 5. UI Components that are used only on a specific page are described in the page

eg. Foo
```
Foo
├── Hoo.tsx // Fooでしか使用されないComponent
└── index.tsx  // Foo本体
```

# Styleについて

In this project, scss is used for styling.
BEM is adopted as the naming convention.

本プロジェクトでは、scssを用いてstylingしています。
命名規則はBEMを採用しています。
http://getbem.com/introduction/

# Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**output coverage**
`npm test -- --coverage --watchAll=false`

## `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
