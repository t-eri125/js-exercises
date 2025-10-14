const infoTableBody = document.querySelector('#navigator-info-table tbody');
const info = {
    'アクセス日時': new Date().toLocaleString(),
    '端末情報': navigator.platform,
    'ユーザーエージェント': navigator.userAgent,
    '言語': navigator.language,
    'ベンダー': navigator.vendor
};

for (const key in info) {
    const tr = document.createElement('tr');
    const tdKey = document.createElement('td');
    const tdValue = document.createElement('td');
    tdKey.textContent = key;
    tdValue.textContent = info[key];
    tr.appendChild(tdKey);
    tr.appendChild(tdValue);
    infoTableBody.appendChild(tr);
}

document.getElementById('check-btn').addEventListener('click', function () {
    alert('これはテストでした');
});
