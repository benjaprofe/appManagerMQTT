# regenerate_project_templates.ps1
# Rewrites control.html and dashboard.html for every folder that starts with "project-"
# Fixed template: proper UTF‑8 characters, simplified client ID, clean Tailwind styling.

$basePath = (Get-Location).Path
$projectDirs = Get-ChildItem -Path $basePath -Directory -Filter "project-*"

$controlTemplate = @'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control - __PROJECT_ID__</title>
    <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {font-family: 'Inter', sans-serif; background:#fafafa; color:#171717;}
        .notification {position:fixed; top:1rem; right:1rem; background:#4caf50; color:white; padding:0.75rem 1rem; border-radius:0.5rem; box-shadow:0 2px 6px rgba(0,0,0,0.2); display:none;}
        .notification.show {display:block;}
    </style>
</head>
<body class="p-6">
    <h1 class="text-2xl font-bold mb-4">Control - __PROJECT_ID__</h1>
    <div id="status" class="mb-4 text-sm">Desconectado</div>
    <div class="grid grid-cols-2 gap-4">
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onclick="publicar('sensor/temperatura/set', '25')">Temperatura 25°C</button>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onclick="publicar('sensor/humedad/set', '60')">Humedad 60%</button>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onclick="publicar('sensor/bateria/set', '80')">Batería 80%</button>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onclick="publicar('sensor/luz/set', 'on')">Luz ON</button>
        <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onclick="publicar('alerta/critica', 'Sobrecalentamiento')">Alerta Crítica</button>
        <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="publicar('modo/set', 'eco')">Modo ECO</button>
    </div>
    <div id="notification" class="notification mt-4"></div>
    <script src="../env/credential.js"></script>
    <script>
        const client = createMqttClient('client_' + '__PROJECT_ID__');
        client.on('connect', () => {updateStatus('Conectado'); showNotif('✅ Conectado a MQTT');});
        client.on('error', err => {updateStatus('Error'); showNotif('❌ Error: '+err, 'error');});
        client.on('offline', () => {updateStatus('Desconectado'); showNotif('⚠️ Offline', 'warning');});
        client.on('message', (topic, msg) => {
            const payload = msg.toString();
            if (topic.includes('/sensor/')) {
                const key = topic.replace('/set','');
                localStorage.setItem(key, payload);
            }
            console.log('📨', topic, payload);
        });
        function updateStatus(txt){document.getElementById('status').textContent = txt;}
        function showNotif(msg, type='success'){
            const n = document.getElementById('notification');
            n.textContent = msg; n.className='notification show';
            if(type==='error') n.style.background='#f44336';
            else if(type==='warning') n.style.background='#ff9800';
            else n.style.background='#4caf50';
            setTimeout(()=>{n.className='notification';},3000);
        }
        function publicar(subtopic, value){
            const topic = '__PROJECT_ID__/' + subtopic;
            if(!client.connected){showNotif('❌ No conectado', 'error'); return;}
            client.publish(topic, value, {qos:1}, err=>{
                if(err) showNotif('❌ Error al publicar', 'error');
                else showNotif('✅ '+subtopic+' = '+value);
            });
        }
    </script>
</body>
</html>
'@

$dashboardTemplate = @'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - __PROJECT_ID__</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {font-family: 'Inter', sans-serif; background:#fafafa; color:#171717;}
        .card {background:#fff;padding:1rem;border-radius:0.5rem;box-shadow:0 2px 6px rgba(0,0,0,0.1);}
    </style>
</head>
<body class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard - __PROJECT_ID__</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card"><h2 class="font-semibold mb-2">Temperatura (°C)</h2><canvas id="tempChart"></canvas></div>
        <div class="card"><h2 class="font-semibold mb-2">Humedad (%)</h2><canvas id="humChart"></canvas></div>
        <div class="card"><h2 class="font-semibold mb-2">Batería (%)</h2><canvas id="batChart"></canvas></div>
        <div class="card"><h2 class="font-semibold mb-2">Luz</h2><div id="lightStatus" class="text-lg"></div></div>
    </div>
    <script src="../env/credential.js"></script>
    <script>
        const client = createMqttClient('client_' + '__PROJECT_ID__');
        client.on('connect',()=>{console.log('Dashboard conectado');});
        client.on('message',(topic,msg)=>{
            const value = msg.toString();
            if(topic.includes('sensor/temperatura')){localStorage.setItem('sensor/temperatura',value); updateTempChart();}
            if(topic.includes('sensor/humedad')){localStorage.setItem('sensor/humedad',value); updateHumChart();}
            if(topic.includes('sensor/bateria')){localStorage.setItem('sensor/bateria',value); updateBatChart();}
            if(topic.includes('sensor/luz')){localStorage.setItem('sensor/luz',value); document.getElementById('lightStatus').textContent = value.toUpperCase();}
        });
        const tempCtx = document.getElementById('tempChart').getContext('2d');
        const humCtx = document.getElementById('humChart').getContext('2d');
        const batCtx = document.getElementById('batChart').getContext('2d');
        const tempChart = new Chart(tempCtx,{type:'line',data:{labels:['Último'],datasets:[{label:'Temp',data:[0],borderColor:'#ff5722',fill:false}]}});
        const humChart = new Chart(humCtx,{type:'line',data:{labels:['Último'],datasets:[{label:'Humedad',data:[0],borderColor:'#2196f3',fill:false}]}});
        const batChart = new Chart(batCtx,{type:'line',data:{labels:['Último'],datasets:[{label:'Batería',data:[0],borderColor:'#4caf50',fill:false}]}});
        function updateTempChart(){let v = parseFloat(localStorage.getItem('sensor/temperatura')||0); tempChart.data.datasets[0].data[0]=v; tempChart.update();}
        function updateHumChart(){let v = parseFloat(localStorage.getItem('sensor/humedad')||0); humChart.data.datasets[0].data[0]=v; humChart.update();}
        function updateBatChart(){let v = parseFloat(localStorage.getItem('sensor/bateria')||0); batChart.data.datasets[0].data[0]=v; batChart.update();}
        updateTempChart(); updateHumChart(); updateBatChart();
        document.getElementById('lightStatus').textContent = (localStorage.getItem('sensor/luz')||'off').toUpperCase();
    </script>
</body>
</html>
'@

foreach ($dir in $projectDirs) {
    $slug = $dir.Name -replace '^project-\d{2}-', ''
    $controlContent = $controlTemplate -replace '__PROJECT_ID__', $slug
    $dashboardContent = $dashboardTemplate -replace '__PROJECT_ID__', $slug
    $controlPath = Join-Path $dir.FullName 'control.html'
    $dashboardPath = Join-Path $dir.FullName 'dashboard.html'
    Set-Content -Path $controlPath -Value $controlContent -Encoding UTF8
    Set-Content -Path $dashboardPath -Value $dashboardContent -Encoding UTF8
    Write-Host "Rewritten $controlPath and $dashboardPath"
}
