let t = [];

function tambah() {
    const input = document.getElementById('input');
    const prioritySelect = document.getElementById('priority');
    const dateInput = document.getElementById('deadline');
    
    // Validasi input tugas tidak boleh kosong
    if (input.value.trim() === '') {
        alert('Tugas tidak boleh kosong!');
        return;
    }
    
    // Validasi tanggal tidak boleh kosong
    if (!dateInput.value) {
        alert('Tanggal deadline harus diisi!');
        return;
    }
    
    // Validasi tanggal tidak boleh sebelum hari ini
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset jam ke 00:00:00
    
    if (selectedDate < today) {
        alert('Tanggal deadline tidak boleh sebelum hari ini!');
        return;
    }
    
    t.push({ 
        id: Date.now(), 
        txt: input.value, 
        done: 0,
        priority: prioritySelect.value,
        deadline: dateInput.value,
        date: new Date().toLocaleString('id-ID', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    });
    input.value = '';
    prioritySelect.value = 'sedang';
    dateInput.value = '';
    show();
}

function tog(id) {
    t = t.map(x => x.id === id ? { ...x, done: !x.done } : x);
    show();
}   

function del(id) {
    if (confirm('Yakin ingin menghapus tugas ini?')) {
        t = t.filter(x => x.id !== id);
        show();
    }
}

function delAll() {
    if (confirm('Yakin ingin menghapus semua tugas?')) {
        t = [];
        show();
    }
}

function edit(id) {
    const task = t.find(x => x.id === id);
    const newText = prompt('Edit tugas:', task.txt);
    if (newText && newText.trim() !== '') {
        t = t.map(x => x.id === id ? { ...x, txt: newText } : x);
        show();
    }
}

function formatTanggal(dateString) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function show() {
    const listEl = document.getElementById('list');
    const deleteAllBtn = document.getElementById('deleteAll');
    
    if (t.length === 0) {
        listEl.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">Belum ada tugas</p>';
        if (deleteAllBtn) deleteAllBtn.style.display = 'none';
    } else {
        if (deleteAllBtn) deleteAllBtn.style.display = 'block';
        
        const sortedTasks = [...t].sort((a, b) => {
            const priorityOrder = { tinggi: 0, sedang: 1, rendah: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        
        listEl.innerHTML = sortedTasks.map(x => `
            <li class="priority-${x.priority} ${x.done ? 'done' : ''}">
                <div>
                    <span>${x.txt}</span>
                    <span class="priority-badge ${x.priority}">${x.priority}</span>
                    <small style="color:#666;font-size:13px;display:block;margin-top:6px;">
                        ⏰ Deadline: ${formatTanggal(x.deadline)}
                    </small>
                    <small style="color:#999;font-size:12px;display:block;margin-top:2px;">
                        Dibuat: ${x.date}
                    </small>
                </div>
                <div>
                    <button onclick="edit(${x.id})">Edit</button>
                    <button onclick="tog(${x.id})">${x.done ? 'Batal' : 'Selesai'}</button>
                    <button onclick="del(${x.id})">Hapus</button>
                </div>
            </li>
        `).join('');
    }
}

// Set minimum date ke hari ini
window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('deadline');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    show();
});