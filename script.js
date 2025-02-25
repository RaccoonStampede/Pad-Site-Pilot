// Show a specific task page and hide others
function showPage(pageId) {
    document.querySelectorAll('.app-container > div').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
    updateProgress(pageId);
}

// Go back to the main page
function goBack() {
    document.querySelectorAll('.task-page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById('main-page').style.display = 'block';
}

// Toggle N/A status for a task (Image 0: N/A Feature)
function toggleNA(stepId, pageId) {
    const li = document.getElementById(stepId).parentElement;
    const checkbox = document.getElementById(stepId);
    const naButton = li.querySelector('.na-btn');
    if (!li.classList.contains('na')) {
        li.classList.add('na');
        checkbox.disabled = true;
        checkbox.checked = false;
        naButton.textContent = 'Undo N/A';
    } else {
        li.classList.remove('na');
        checkbox.disabled = false;
        naButton.textContent = 'N/A';
    }
    updateProgress(pageId);
}

// Update progress bar based on completed tasks (Image 0: Task Tracker)
function updateProgress(pageId) {
    const page = document.getElementById(pageId);
    const totalTasks = page.querySelectorAll('.checklist li:not(.na)').length;
    const completedTasks = page.querySelectorAll('.checklist input:checked').length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    page.querySelector('.progress').style.width = `${progress}%`;

    if (progress === 100) {
        alert('Job Completed!'); // Image 0: Notification Indicating Finished Job
    }
}

// Save progress to local storage (Image 0: Save and Reload Feature)
function saveProgress() {
    const state = {};
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => {
        state[cb.id] = { checked: cb.checked, na: cb.parentElement.classList.contains('na') };
    });
    localStorage.setItem('padPilotProgress', JSON.stringify(state));
    alert('Progress saved!');
}

// Load saved progress from local storage
function loadProgress() {
    const state = JSON.parse(localStorage.getItem('padPilotProgress') || '{}');
    for (const [id, { checked, na }] of Object.entries(state)) {
        const cb = document.getElementById(id);
        if (cb) {
            cb.checked = checked;
            if (na) toggleNA(id, cb.closest('.task-page').id);
        }
    }
}

// Reset the app for a new job (Image 8, 9: Reset for New Job)
function resetJob() {
    if (confirm('Reset for a new job?')) {
        localStorage.removeItem('padPilotProgress');
        location.reload();
    }
}

// Initialize the app on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    showPage('main-page');
});