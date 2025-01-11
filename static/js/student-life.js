// Function to toggle society content visibility
function toggleSociety(header) {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');
    
    // Close all other society cards
    document.querySelectorAll('.society-header.active').forEach(activeHeader => {
        if (activeHeader !== header) {
            activeHeader.classList.remove('active');
            activeHeader.nextElementSibling.classList.remove('active');
            activeHeader.nextElementSibling.style.maxHeight = '0';
        }
    });
    
    // Toggle current society card
    if (!isActive) {
        header.classList.add('active');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        header.classList.remove('active');
        content.classList.remove('active');
        content.style.maxHeight = '0';
    }
}

// Initialize sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle submenu on click
    document.querySelectorAll('.menu-item').forEach(item => {
        const title = item.querySelector('.menu-title');
        const submenu = item.querySelector('.submenu');
        
        if (title && submenu) {
            title.addEventListener('click', () => {
                item.classList.toggle('active');
                const icon = title.querySelector('i.fas');
                if (icon) {
                    icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : '';
                }
            });
        }
    });

    // Close sidebar button functionality
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.remove('active');
        });
    }
});
