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
});const predefinedSteps = {
    Flare: [
        "New location, flare located at far end of most pad sites",
        "Reinstall 3/4\" conduit from flare disconnect to location of flare VFD panel",
        "Install a guat box on conduit and continue conduit run to the end of flare pipe rack",
        "Stack, add flex from guat to panel and pull wire through conduit to guat box with enough wire to go",
        "Install 3/4\" flex from guat box to SPC panel or other type of flare VFD panel",
        "Install 3/4\" flex from end of conduit run to flare blower motor",
        "Pull wire (#10 THHN, Brown/Orange/Yellow/Green) from flare disconnect on panel rack to guat box, VFD panel",
        "Pull wire from flare panel to flare blower motor and terminate",
        "Terminating wires - flare panel wires (coming from disconnect) will terminate on P side of breaker inside VFD",
        "Blower motor wires will terminate on the drive inside panel, will have to remove covers to access",
        "Flare blower motor will be terminated (L1-Brown) as indicated on nameplate"
    ],
    Igniter: [
        "Igniter control box (red plastic box) usually mounted on or near flare",
        "VFD panel mounted on or near flare",
        "Reinstall 3/4\" flex from VFD panel to igniter panel",
        "Pull wire (#10 THHN, Black/White/Green) from VFD panel to igniter panel",
        "From VFD panel wires to igniter panel, terminate on low voltage control transformer",
        "Igniter panel wires terminate on power supply terminals marked L1, N, Ground",
        "Igniter on new flare stack",
        "Wiring zone prewired on flare stack",
        "Open round J-box and check wiring colors (Red/Yellow tied to L, Black/White tied to N)",
        "Run cable down conduit from back to igniter control panel and install into panel",
        "Terminate wires to green blocks on the inside of door panel labeled XF Igniter (L+R), match colors with cable terminations on J-box on flare stack",
        "Terminate last two wires on terminals marked TEMP"
    ],
    BottomsPump: [
        "Bottoms pump (circulation pump), location varies",
        "Get needed 3/4\" of 2\" rigid conduit, install conduit from panel rack to location of bottoms pump",
        "Install 3/4\" flex from conduit to bottoms pump panel",
        "Cut 2 pieces of unistrut at 5', use 2 exhaust clamps to mount unistrut to leg of bottoms pump stand",
        "Cut 5' of 2\" rigid conduit, mount conduit on unistrut with 2\" unistrut straps, cement poles",
        "Use bottoms pump panel, needs holes",
        "Drill 4 holes in mounting brackets of bottoms pump panel, use exhaust clamps for hole reference (2 holes on top and 2 holes on bottom)",
        "Mount pump panel to pole using exhaust clamps",
        "Install 3/4\" flex from the end of conduit run to the bottom of pump panel",
        "Pull wire (#10 THHN, Brown/Yellow/Black/Green) from flare disconnect to pump panel rack and terminate at the top of disconnect inside panel",
        "Install 3/4\" flex from panel to pump motor on stand"
    ],
    AirCompressor: [
        "Air compressor, install 3/4\" conduit from air compressor disconnect to air compressor VFD on power panel rack",
        "Pull wire (#8/#8/#8/#10 THHN) from disconnect to disconnect",
        "Install 3/4\" flex from the end of conduit to the bottom of disconnect on skid",
        "Terminate wires on top side of disconnect on air compressor skid"
    ],
    SaltWaterPump: [
        "Salt water pump (SWP)",
        "Reinstall 1\" conduit from saltwater pump disconnect to location of SWP VFD",
        "Install 1\" flex from conduit to VFD panel",
        "Pull wire from disconnect on power panel rack to VFD panel and terminate wires on top side of disconnect breaker in panel",
        "Install 1\" flex from VFD to SWP motor",
        "Pull wire from VFD to pump motor and terminate in accordance with name plate on motor",
        "Terminate N wires on VFD pump panel on the bottom of VFD (remove cover)"
    ],
    '120VSystem': [
        "Placeholder: Install 120V wiring from panel to equipment",
        "Placeholder: Test 120V connections",
        "Placeholder: Verify voltage at equipment"
    ]
};
