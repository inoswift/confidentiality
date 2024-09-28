document.getElementById('uploadBtn').addEventListener('click', async function() {
    const fileInput = document.getElementById('fileInput').files[0];
    const formData = new FormData();
    formData.append('file', fileInput);

    try {
        const response = await fetch('/api/creator/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert('Error uploading file');
    }
});

async function fetchFiles() {
    const response = await fetch('/api/files', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    const files = await response.json();
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.textContent = file.name;
        fileList.appendChild(fileItem);
    });
}

document.addEventListener('DOMContentLoaded', fetchFiles);