***
### Code to know

## Light and dark mode favicons
```js
<link href="light-mode-favicon.png" rel="icon" media="(prefers-color-scheme: light)"/>
<link href="dark-mode-favicon.png" rel="icon" media="(prefers-color-scheme: dark)"/>
```

## Get and set CSS variables
```js
const root = document.documentElement; // Root
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color'); // Get
root.style.setProperty('--primary-color', 'blue'); // Set
```
```html
<div style="--primary-color: red">This is a div</div> // Set in DOM
```

## Display "leave site?" modal
![plot](https://phuoc.ng/assets/html-dom/leave-site.png)
```js
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
});
```
