function uploadVideo() {
  const video = document.getElementById("video").files[0];
  const title = document.getElementById("title").value;

  if (!video) {
    alert("Please select a video");
    return;
  }

  const formData = new FormData();
  formData.append("video", video);
  formData.append("title", title);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      const bar = document.getElementById("progress-bar");
      bar.style.width = percent + "%";
      bar.innerText = percent + "%";
    }
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Upload Complete 🎉");
    }
  };

  xhr.send(formData);
}let file;
let chunkSize = 1024 * 1024; // 1MB
let offset = 0;
let paused = false;

function startUpload() {
  file = document.getElementById("video").files[0];
  paused = false;
  uploadChunk();
}

function pauseUpload() {
  paused = true;
}

function resumeUpload() {
  paused = false;
  uploadChunk();
}

function uploadChunk() {
  if (paused || offset >= file.size) return;

  const chunk = file.slice(offset, offset + chunkSize);
  const formData = new FormData();
  formData.append("chunk", chunk);
  formData.append("offset", offset);
  formData.append("filename", file.name);

  fetch("/upload-chunk", {
    method: "POST",
    body: formData
  }).then(() => {
    offset += chunkSize;
    let percent = Math.min((offset / file.size) * 100, 100);
    document.getElementById("progress").style.width = percent + "%";
    document.getElementById("progress").innerText = Math.round(percent) + "%";
    uploadChunk();
  });
}