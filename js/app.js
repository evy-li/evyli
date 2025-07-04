document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('openModal');
    var openBtn = document.getElementById('openModalBtn');

    if (modal && openBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('open');
        });

        // Close modal on click outside modal content
        modal.addEventListener('mousedown', function(e) {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });

        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('open');
            }
        });

        // Close modal on "close" link
        var closeLink = modal.querySelector('a[title="Close"]');
        if (closeLink) {
            closeLink.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.remove('open');
            });
        }
    }
});
