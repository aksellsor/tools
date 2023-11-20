***
### Code to know

## Light and dark mode favicons
```js
<link href="light-mode-favicon.png" rel="icon" media="(prefers-color-scheme: light)"/>
<link href="dark-mode-favicon.png" rel="icon" media="(prefers-color-scheme: dark)"/>
```

## Get and set CSS variables
```js
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
root.style.setProperty('--primary-color', 'blue');
```
```html
<div style="--primary-color: red">This is a div</div>
```
