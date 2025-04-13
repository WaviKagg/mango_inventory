document.addEventListener('DOMContentLoaded', fetchInventory);

function fetchInventory() {
  const list = document.getElementById('inventory');
  db.ref('inventory').on('value', (snapshot) => {
    list.innerHTML = '';
    snapshot.forEach((child) => {
      const li = document.createElement('li');
      li.textContent = child.key;
      list.appendChild(li);
    });
  });
}

function startScan(mode) {
  const html5QrCode = new Html5Qrcode("scanner");
  document.getElementById("scanner").style.display = "block";

  Html5Qrcode.getCameras().then((devices) => {
    if (devices && devices.length) {
      const cameraId = devices[0].id;

      html5QrCode.start(cameraId, {
        fps: 10,
        qrbox: 250
      },
      qrCodeMessage => {
        document.getElementById("scanner").style.display = "none";
        html5QrCode.stop();

        if (mode === 'add') {
          db.ref('inventory/' + qrCodeMessage).set(true);
        } else if (mode === 'remove') {
          db.ref('inventory/' + qrCodeMessage).remove();
        }
      });
    }
  }).catch(err => {
    console.error(err);
  });
}
