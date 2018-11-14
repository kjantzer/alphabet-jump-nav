Alphabet Jump Nav
=======================

![author](https://img.shields.io/badge/author-Kevin%20Jantzer-blue.svg)
![since](https://img.shields.io/badge/since-2018--11-blue.svg)
![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-green.svg)

> A mobile friendly alphabetical side navigation to quickly jump between sections of a list. Similar to the iOS section index navigation.

![preview](preview.gif)

# Install

`npm install alphabet-jump-nav`

# Using

```html
<div class="my-view">
	<ul id="my-list">
		<li data-title="A Title">A Title</li>
		<li data-title="B Title">B Title</li>
		<li data-title="C Title">C Title</li>
		<li data-title="D Title">D Title</li>
		<!-- ..... -->
		<li data-title="Z Title">Z Title</li>
	</ul>
</div>
```

```js
let JumpNav = require('alphabet-jump-nav')

let myView = document.querySelector('#my-view')
let myList = document.querySelector('#my-list')
let jumpNav = new JumpNav()

jumpNav.appendTo(myView)
jumpNav.linkTo(myList)
```

> Dont forget to import the CSS `@import "node_modules/alphabet-jump-nav/style.less"`

## Changelog

#### v1.0.0
- Initial release

## License

MIT © [Kevin Jantzer](https://twitter.com/kjantzer) – Blackstone Publishing