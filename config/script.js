document.addEventListener('DOMContentLoaded', () => {
    let windowsCount = 0;
    const taskbarItems = document.getElementById('taskbar-items');
    const windowsContainer = document.getElementById('windows-container');

    // Function to create a new window
    function createWindow(title) {
        windowsCount++;

        // Create window elements
        const windowElement = document.createElement('div');
        windowElement.classList.add('window');
        windowElement.innerHTML = `
            <div class="titlebar">
                <div class="window-title">${title}</div>
                <div class="window-controls">
                    <button class="minimize-btn">–</button>
                    <button class="maximize-btn">[]</button>
                    <button class="close-btn">X</button>
                </div>
            </div>
            <div class="window-content">
                <p>Welcome to ${title}!</p>
            </div>
        `;

        windowsContainer.appendChild(windowElement);

        // Add the window to the taskbar
        const taskbarItem = document.createElement('button');
        taskbarItem.classList.add('taskbar-item');
        taskbarItem.innerText = title;
        taskbarItem.addEventListener('click', () => {
            makeActiveWindow(windowElement);
        });
        taskbarItems.appendChild(taskbarItem);

        // Window controls
        const closeBtn = windowElement.querySelector('.close-btn');
        const minimizeBtn = windowElement.querySelector('.minimize-btn');
        const maximizeBtn = windowElement.querySelector('.maximize-btn');

        // Close window
        closeBtn.addEventListener('click', () => {
            windowElement.style.display = 'none';
            taskbarItem.style.display = 'none';
        });

        // Minimize window
        minimizeBtn.addEventListener('click', () => {
            windowElement.classList.add('minimized');
        });

        // Maximize window
        maximizeBtn.addEventListener('click', () => {
            windowElement.style.width = '100vw';
            windowElement.style.height = '100vh';
            windowElement.style.top = '0';
            windowElement.style.left = '0';
        });

        // Make window draggable
        makeDraggable(windowElement);

        // Activate window when clicked
        windowElement.addEventListener('click', () => {
            makeActiveWindow(windowElement);
        });

        // Reset window size on double-click (if maximized)
        windowElement.addEventListener('dblclick', () => {
            if (windowElement.style.width === '100vw') {
                windowElement.style.width = '300px';
                windowElement.style.height = '200px';
                windowElement.style.top = `${50 + 100 * windowsCount}px`;
                windowElement.style.left = `${50 + 100 * windowsCount}px`;
            }
        });

        makeActiveWindow(windowElement);
    }

    // Function to make a window active (focus on it)
    function makeActiveWindow(windowElement) {
        const allWindows = document.querySelectorAll('.window');
        allWindows.forEach(win => win.classList.remove('active'));
        windowElement.classList.add('active');
    }

    // Make window draggable
    function makeDraggable(windowElement) {
        const titleBar = windowElement.querySelector('.titlebar');
        let isDragging = false;
        let offsetX, offsetY;

        titleBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            windowElement.classList.add('draggable');
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                windowElement.style.left = `${e.clientX - offsetX}px`;
                windowElement.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            windowElement.classList.remove('draggable');
        });
    }

    // Initialize some apps when dock items are clicked
    document.getElementById('app1').addEventListener('click', () => {
        createWindow('App 1');
    });

    document.getElementById('app2').addEventListener('click', () => {
        createWindow('App 2');
    });

    document.getElementById('app3').addEventListener('click', () => {
        createWindow('App 3');
    });
});
