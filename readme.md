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

## Detect dark mode using JS
```js
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const noPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: no-preference)').matches;
```

## Display "leave site?" modal
![plot](https://phuoc.ng/assets/html-dom/leave-site.png)
```js
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
});
```

## Check if an element is visible in the viewport
```js
const isInViewport = function (ele) {
    const rect = ele.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
```

## Swap position of two nodes in the DOM
```js
const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
};
```

## Replace default 404 image
```js
// Assume that I want to replace all images on the page
const images = document.querySelectorAll('img');

// Loop over them
[].forEach.call(images, function (ele) {
    ele.addEventListener('error', function (e) {
        e.target.src = '/path/to/404/image.png';
    });
});
```

## Resize iframe to fit its content
```js
frame.addEventListener('load', function () {
    // Get the height of the content
    const height = frame.contentDocument.body.scrollHeight;

    // Set the height of iframe
    frame.setAttribute('height', `${height}px`);
});
``

## Insert HTML before or after element
```js
// Insert before
ele.insertAdjacentHTML('beforebegin', html);

// Insert after
ele.insertAdjacentHTML('afterend', html);
```

## Go back a page
```js
history.back(); // Or history.go(-1);
``

## Wrap an element around another elementer
```js
// First, insert `wrapper` before `ele` in its parent node
ele.parentNode.insertBefore(wrapper, ele);

// And then, turn `ele` into a children of `wrapper`
wrapper.appendChild(ele);
```

## Replace an element
```js
ele.parentNode.replaceChild(newEle, ele);
```

## Remove all children of a node
```js
// ele.innerHTML = '';
// This method isn't recommended because it doesn't remove event handlers of child node. Hence, it might cause a memory leak if you are managing a big list of elements.
while (node.firstChild) {
    node.removeChild(node.firstChild);
}
```
