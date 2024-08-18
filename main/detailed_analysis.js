// detailed_analysis.js

document.addEventListener('DOMContentLoaded', () => {
    const chatToggleButton = document.querySelector('.chat-toggle');
    const chatBox = document.getElementById('chatBox');
    const closeChatButton = document.querySelector('.close-chat');

    // Toggle chat box visibility
    if (chatToggleButton) {
        chatToggleButton.addEventListener('click', () => {
            if (chatBox.style.display === 'none' || chatBox.style.display === '') {
                chatBox.style.display = 'block';
            } else {
                chatBox.style.display = 'none';
            }
        });
    }

    // Close chat box
    if (closeChatButton) {
        closeChatButton.addEventListener('click', () => {
            chatBox.style.display = 'none';
        });
    }
});
