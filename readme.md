***
### AI Tools
* Generate music based on Genre and lyrics [Suno]([https://gsap.com/](https://discord.com/invite/suno-ai) "Suno Discord")

***
### Tech to learn
* [ ] [GSAP](https://gsap.com/ "Gsap website")
* [ ] [LazySizes](https://afarkas.github.io/lazysizes/index.html "LazySizes docs")

***
### Code to know

## Freeze browser window after x delay (useful for debugging :hover, :focus effects)
```css
setTimeout(function(){debugger;}, 2000)
```

## Prevent body scroll when modal is open (but keeping scroll position)
```css
body.noscroll {
    height: 100vh;
    width: 100vw;
    touch-action: none;
    -webkit-overflow-scrolling: none;
    overflow: hidden;
    overscroll-behavior: none;
}
```

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

## Check if an element is visible in a scrollable container
```js
const isVisibleInContainer = function (ele, container) {
    const eleTop = ele.offsetTop;
    const eleBottom = eleTop + ele.clientHeight;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    // The element is fully visible in the container
    return (
        (eleTop >= containerTop && eleBottom <= containerBottom) ||
        // Some part of the element is visible in the container
        (eleTop < containerTop && containerTop < eleBottom) ||
        (eleTop < containerBottom && containerBottom < eleBottom)
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

## Full screen container button
```html
<button id="fullscreen">Go fullscreen</button>
<div id="container">This content will be fullscreen</div>
```
```js
let button = document.querySelector("#fullscreen");
let container = document.querySelector("#container");
button.addEventListener('click', () => {
    if (document.fullscreenEnabled) {
        if (container.mozRequestFullScreen) {
            // Use mozRequestFullScreen() for Firefox
            //  and other Mozilla-based browsers
            container.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullScreen) {
            // Use webkitEnterFullscreen() for Safari
            // and other WebKit-based browsers
            container.webkitRequestFullScreen();
        } else {
            // Use requestFullscreen() for all other browsers
            container.requestFullscreen();
        }
    }
});
```


## Wait for target element to become available
```js
const observer = new MutationObserver((mutations) => {
    const targetElement = document.getElementById('my-element');

    // Check if the target element has been added to the DOM
    if (targetElement)) {
        // Stop tracking
        observer.disconnect();

        // The target element is available, do something with it
        console.log('Element is now available');
    }
});
observer.observe(document.body, {
    childList: true,
    subtree: true,
});
```

## Scroll an element to ensure it is visible in a scrollable container
```js
const scrollToBeVisible = function (ele, container) {
    const eleTop = ele.offsetTop;
    const eleBottom = eleTop + ele.clientHeight;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    if (eleTop < containerTop) {
        // Scroll to the top of container
        container.scrollTop -= containerTop - eleTop;
    } else if (eleBottom > containerBottom) {
        // Scroll to the bottom of container
        container.scrollTop += eleBottom - containerBottom;
    }
};
```

# More advanced stuff

## Print image button
```html
<div style="display: flex; flex-direction: column; justify-content: center; padding: 4rem">
    <img id="image" src="https://via.placeholder.com/300x300" />
    <div style="margin-top: 1rem; text-align: center">
        <button
            style="background-color: #63b3ed; border: none; color: #fff; cursor: pointer; padding: 0.5rem 1rem"
            id="print"
        >
            Print
        </button>
    </div>
</div>
```
```js
document.addEventListener('DOMContentLoaded', function () {
    // Query the element
    const printBtn = document.getElementById('print');

    printBtn.addEventListener('click', function () {
        // Create a fake iframe
        const iframe = document.createElement('iframe');

        // Make it hidden
        iframe.style.height = 0;
        iframe.style.visibility = 'hidden';
        iframe.style.width = 0;

        // Set the iframe's source
        iframe.setAttribute('srcdoc', '<html><body></body></html>');

        document.body.appendChild(iframe);

        iframe.contentWindow.addEventListener('afterprint', function () {
            iframe.parentNode.removeChild(iframe);
        });

        iframe.addEventListener('load', function () {
            // Clone the image
            const image = document.getElementById('image').cloneNode();
            image.style.maxWidth = '100%';

            // Append the image to the iframe's body
            const body = iframe.contentDocument.body;
            body.style.textAlign = 'center';
            body.appendChild(image);

            image.addEventListener('load', function () {
                // Invoke the print when the image is ready
                iframe.contentWindow.print();
            });
        });
    });
});
```

## Add a loading indicator to iframe
```html
<div class="container">
    <!-- The loading indicator -->
    <div class="loading" id="loading">Loading</div>

    <!-- The iframe -->
    <iframe id="frame" style="opacity: 0"></iframe>
</div>
```
```css
.container {
    /* To position the loading */
    position: relative;
}

.loading {
    /* Absolute position */
    left: 0;
    position: absolute;
    top: 0;

    /* Take full size */
    height: 100%;
    width: 100%;

    /* Center */
    align-items: center;
    display: flex;
    justify-content: center;
}
```
```js
// Query the elements
const iframeEle = document.getElementById('iframe');
const loadingEle = document.getElementById('loading');

iframeEle.addEventListener('load', function () {
    // Hide the loading indicator
    loadingEle.style.display = 'none';

    // Bring the iframe back
    iframeEle.style.opacity = 1;
});
```

## Paste an image from the clipboard
```html
<div class="container">
    <div>
        <div><kbd class="key">Ctrl</kbd> + <kbd class="key">V</kbd> in this window.</div>
        <img class="preview" id="preview" />
    </div>
</div>
```
```css
.container {align-items: center;display: flex;justify-content: center;height: 32rem;padding: 1rem 0;}
.key {background-color: #f7fafc;border: 1px solid #cbd5e0;border-radius: 0.25rem;padding: 0.25rem;}
.preview {align-items: center;border: 1px solid #cbd5e0;display: flex;justify-content: center;margin-top: 1rem;max-height: 16rem;max-width: 42rem;}
```
```js
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('paste', function (evt) {
        const clipboardItems = evt.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter(function (item) {
            // Filter the image items only
            return item.type.indexOf('image') !== -1;
        });
        if (items.length === 0) {
            return;
        }

        const item = items[0];
        const blob = item.getAsFile();

        const imageEle = document.getElementById('preview');
        imageEle.src = URL.createObjectURL(blob);
    });
});
```
