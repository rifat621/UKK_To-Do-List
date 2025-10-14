let t = [];

function tambah() {
    const input = document.getElementById('input');
    if (input.value.trim() === '') return;
    t.push({ 
        id: Date.now(), 
        txt: input.value, 
        done: 0,
        date: new Date().toLocaleString('id-ID', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    });
    input.value = '';
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

function show() {
    const listEl = document.getElementById('list');
    const deleteAllBtn = document.getElementById('deleteAll');
    
    if (t.length === 0) {
        listEl.innerHTML = '<p style="text-align:center;color:#999;">Belum ada tugas</p>';
        if (deleteAllBtn) deleteAllBtn.style.display = 'none';
    } else {
        if (deleteAllBtn) deleteAllBtn.style.display = 'block';
        listEl.innerHTML = t.map(x => `
            <li class="${x.done ? 'done' : ''}">
                <div>
                    <span>${x.txt}</span>
                    <small style="color:#999;font-size:12px;display:block;margin-top:4px;">${x.date}</small>
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