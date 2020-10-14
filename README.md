## Do you have any strong rationale for why you chose specific development technologies for
this project that you would like to share with the team?

React + hooks

- Since many engineers are using it, it is easy to hire.
- Many companies have adopted it.
- Declarative, readable and maintainable
- With the advent of hooks, readability has improved.
- I'm most used to

- 使用してる技術者が多いので採用が簡単である。
- 採用している企業が多い。
- 宣言的で可読性、メンテナンス性が高い
- hooksの登場でさらに可読性が上がった

## Do you have any strong rationale for why you made specific design decisions (software
architecture design) over alternatives?

- Separated business logic and View using hooks.
- hooks is now aware of the flux architecture and now controls data flow in one direction

- hooksを用いてビジネスロジックとViewを分離した。
- hooksはfluxアーキテクチャを意識して、一方向のデータフロー制御を行うようにした

## Do you have any strong rationale for why you made specific implementation decisions over
alternatives?

Changed the List part of Popover to selectbox.
As the list grows, it doesn't fit in the popover, and selectbox is so common that users don't have to worry about it.

PopoverのList部分をselectboxに変更しました。
Listが増えるとPopover内に収まらなくなるし、selectboxは一般的なのでユーザーが悩むことはないと思いました。

## [Optional] What else would you like to improve if you have more time? This can be in simple
format like a TODO bullet points

- e2e testing
- unit test more
- custom error 
- __mocks__
- atomic dezign
- docker-compose
- BEM fix
- split scss File for each component

## [Optional] If you feel like there are things you’d like to implement and/or fix, feel free to add a
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

# Style

In this project, scss is used for styling.
BEM is adopted as the naming convention.

本プロジェクトでは、scssを用いてstylingしています。
命名規則はBEMを採用しています。
http://getbem.com/introduction/
