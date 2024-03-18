const MB = ' MB';

const totalSize = 10;

let usedSize = 0;
let percent;
let sizeLeft;

const usedSizeElement = document.getElementById('sizeOccupied');
const totalSizeElement = document.getElementById('totalSize');
const sizeLeftElement = document.getElementById('sizeLeft');
const progressElement = document.getElementById('progress');
const selectedFileP = document.getElementById('selectedFile');

const shortenSizeNumber = (x) => {
  return x.toFixed(2);
};

const init = () => {
  usedSize = 0;
  percent = 100 * (usedSize / totalSize) + 4;
  sizeLeft = totalSize - usedSize;
  totalSizeElement.innerText = totalSize + MB;
  sizeLeftElement.innerText = shortenSizeNumber(sizeLeft);
  usedSizeElement.innerText = shortenSizeNumber(usedSize) + MB;
  progressElement.style.width = percent.toString(1) + '%';
};

const addSize = (size) => {
  size /= Math.pow(1024, 2);
  if (usedSize + size < totalSize) {
    usedSize += size;
    sizeLeft = totalSize - usedSize;
    percent = 100 * (usedSize / totalSize) - 4;
    usedSizeElement.innerText = shortenSizeNumber(usedSize) + MB;
    sizeLeftElement.innerText = shortenSizeNumber(sizeLeft);
    progressElement.style.width = percent + '%';
    progressElement.style.transition = 'width 0.5s ease 0.1s';
  } else {
    alert('There is not enough space on the disk');
  }
};

const addFile = (name, size) => {
  addSize(size);
  const span = document.createElement('span');
  span.innerText = name;
  const removeButton = document.createElement('button');
  removeButton.innerText = 'x';
  removeButton.addEventListener('click', () => {
    span.remove();
    addSize(-size);
  });
  span.classList.add('file-span');
  selectedFileP.appendChild(span);
};

const onFileInputChange = (e) => {
  const fileName = e.value.split('\\').pop();
  const isValidFile = new RegExp('(.(gif|jpeg|jpg|png|svg|ico))').test(
    fileName
  );
  if (isValidFile) {
    const file = e.files[0];
    addFile(fileName, file.size);
  } else {
    alert('File Type Not Supported');
  }
};

init();
