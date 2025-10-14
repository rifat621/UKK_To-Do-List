let t = [];

function tambah() {
    const input = document.getElementById('input');
    if (input.value.trim() === '') return;
    t.push({ id: Date.now(), txt: input.value, done: 0 });
    input.value = '';
    show();
}

function tog(id) {
    t = t.map(x => x.id === id ? { ...x, done: !x.done } : x);
    show();
}   

function del(id) {
    t = t.filter(x => x.id !== id);
    show();
}

function show() {
    document.getElementById('list').innerHTML = t.map(x => `
        <li class="${x.done ? 'done' : ''}">
            <span>${x.txt}</span>
            <div>
                <button onclick="tog(${x.id})">${x. done ? 'Batal' : 'Selesai'}</button>
                <button onclick="del(${x.id})">Hapus</button>
            </div>
        </li>
    `).join('');
}