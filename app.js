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
  const qrRegion = document.getElementById("scanner");
  qrRegion.innerHTML = ""; // Clear previous scans
  qrRegion.style.display = "block";

  const html5QrCode = new Html5Qrcode("scanner");

  html5QrCode
    .start(
      { facingMode: "environment" }, // Use back camera
      {
        fps: 10,
        qrbox: 250,
      },
      (qrCodeMessage) => {
        html5QrCode.stop().then(() => {
          qrRegion.style.display = "none";

          if (mode === "add") {
            db.ref("inventory/" + qrCodeMessage).set(true);
          } else if (mode === "remove") {
            db.ref("inventory/" + qrCodeMessage).remove();
          }

          alert(`${mode === "add" ? "Added" : "Removed"}: ${qrCodeMessage}`);
        });
      },
      (errorMessage) => {
        // console.log(`Scan error: ${errorMessage}`);
      }
    )
    .catch((err) => {
      console.error("Camera start error", err);
      alert("Failed to access camera. Make sure to allow camera permissions.");
    });
}
