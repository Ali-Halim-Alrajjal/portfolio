// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Function to load and animate content
    function loadContent(url, slideDirection = 'down') {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load content');
                }
                return response.text();
            })
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const mainContent = tempDiv.querySelector('main');

                if (!mainContent) {
                    throw new Error('Main content not found');
                }

                const header = document.querySelector('.site-header');
                let existingMain = document.querySelector('main');

                // If there's existing content, slide it up and remove it
                if (existingMain) {
                    existingMain.style.transition = 'opacity 0.5s, transform 0.5s';
                    existingMain.style.opacity = '0';
                    existingMain.style.transform = 'translateY(-20px)';
                    
                    // Wait for animation to complete before removing
                    setTimeout(() => {
                        existingMain.remove();
                    }, 500);
                }

                const newMain = document.createElement('main');
                newMain.innerHTML = mainContent.innerHTML;
                newMain.style.opacity = '0';
                newMain.style.transform = slideDirection === 'down' ? 
                    'translateY(-20px)' : 'translateY(20px)';
                newMain.style.transition = 'opacity 0.5s, transform 0.5s';

                // Wait a bit for the old content to start sliding away
                setTimeout(() => {
                    header.insertAdjacentElement('afterend', newMain);

                    // Trigger reflow
                    newMain.offsetHeight;

                    // Animate in
                    newMain.style.opacity = '1';
                    newMain.style.transform = 'translateY(0)';
                }, 250);
            })
            .catch(error => {
                console.error('Error loading content:', error);
            });
    }

    // Handle About link click
    document.querySelector('.about').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('/main.html', 'down');
    });

    // Handle Projects link click
    document.querySelector('.work').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('/work.html', 'down');
    });
            // Dropdown on click for mobile
            var infoLink = document.querySelector('.info');
            var dropdown = infoLink.querySelector('.dropdown-content');
            function isMobile() {
                return window.innerWidth <= 900;
            }
            if (infoLink && dropdown) {
                infoLink.addEventListener('click', function(e) {
                    if (isMobile()) {
                        e.preventDefault();
                        dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
                    }
                });
                // Hide dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (isMobile() && !infoLink.contains(e.target)) {
                        dropdown.style.display = 'none';
                    }
                });
            }
});

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}