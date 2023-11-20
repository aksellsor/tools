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

## Replace default 404 fallback images
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
```

## Wrap an element around another elementer
```js
// First, insert `wrapper` before `ele` in its parent node
ele.parentNode.insertBefore(wrapper, ele);

// And then, turn `ele` into a children of `wrapper`
wrapper.appendChild(ele);
```

## Unwrap an element from parent
```js
// Get the parent node
const parent = ele.parentNode;

// Move all children node to the parent
while (ele.firstChild) {
    parent.insertBefore(ele.firstChild, ele);
}

// `ele` becomes an empty element
// Remove it from the parent
parent.removeChild(ele);
```

## Replace an element
```js
ele.parentNode.replaceChild(newEle, ele);
```

## Replace nodes in a wrapper (e.g. in a search)
```js
let links = document.querySelector(".links");
let newChildren = [];
filtered?.forEach(url => {
    let a = document.createElement("a");
    a.href = url.href;
    a.innerText = url.label;
    newChildren.push(a);
});
links.replaceChildren(...newChildren);
```

## Remove all children of a node
```js
// ele.innerHTML = '';
// This method isn't recommended because it doesn't remove event handlers of child node. Hence, it might cause a memory leak if you are managing a big list of elements.
while (node.firstChild) {
    node.removeChild(node.firstChild);
}
```
## Truncate text that is overflowing using CSS
```css
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

## Create a full screen browser button
```html
<button id="fullscreen">Go fullscreen</button>
```
```js
document.querySelector("#fullscreen")?.addEventListener('click', () => {
    if (document.fullscreenEnabled) {
        if (document.body.mozRequestFullScreen) {
            // Use mozRequestFullScreen() for Firefox
            //  and other Mozilla-based browsers
            document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullScreen) {
            // Use webkitEnterFullscreen() for Safari
            // and other WebKit-based browsers
            document.body.webkitRequestFullScreen();
        } else {
            // Use requestFullscreen() for all other browsers
            document.body.requestFullscreen();
        }
    }
});
```

