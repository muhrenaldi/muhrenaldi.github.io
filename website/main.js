const getDate = new Date();
const getYear = getDate.getFullYear();
const getMont = getDate.getMonth() + 1;
const getDay = getDate.getDate();

function bulan(){
  if(getMont < 10){
    bulan = `0${getMont}`;
  } else{
    bulan = getMont
  }
  return bulan
}
function hari(){
  if(getDay < 10){
    hari = `0${getDay}`;
  } else{
    hari = getDay
  }
  return hari
}

const tanggal = `${getYear}-${bulan()}-${hari()}`;

const tampilKota = document.querySelector('.judul-kota');
tampilKota.textContent = localStorage.judulkota

function getJadwalSholat() {
  fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + parseInt(localStorage.idkota) + '/tanggal/' + tanggal)
  .then(response => response.json())
  .then(data => {
    const jadwal = data.jadwal.data;
    document.querySelector('.imsak').textContent = jadwal.imsak;
    document.querySelector('.subuh').textContent = jadwal.subuh;
    document.querySelector('.terbit').textContent = jadwal.terbit;
    document.querySelector('.dhuha').textContent = jadwal.dhuha;
    document.querySelector('.ashar').textContent = jadwal.ashar;
    document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
    document.querySelector('.maghrib').textContent = jadwal.maghrib;
    document.querySelector('.isya').textContent = jadwal.isya;
    document.querySelector('.tanggal').textContent = jadwal.tanggal;
  });
}

let inputSearch = document.getElementById('inputSearch')
const cardList = document.getElementsByClassName('card-list')[0]


inputSearch.addEventListener('keyup',function(){
  let valueSearch = inputSearch.value.length;

  if(valueSearch > 0) {
    cardList.classList.remove('hidden-list');

    fetch('https://api.banghasan.com/sholat/format/json/kota')
      .then(response => response.json())
      .then(response => {
        const kota = response.kota;
        let listKota = '';
       
        const namaKota = document.getElementsByClassName('card-list')[0];
        kota.forEach(kota => {
          const filterText = inputSearch.value.toLowerCase();
          const itemText = kota.nama.toLowerCase();
          if(itemText.indexOf(filterText) != -1){
            listKota += `<a href="#" data-idkota="${kota.id}" id="nama-kota">${kota.nama}</a><br>`;
          }
        });
        namaKota.innerHTML = listKota;

        const isiKota = document.querySelectorAll('#nama-kota');
        isiKota.forEach( kota => {
          kota.addEventListener('click', function(){
            console.log('kota')
            const idkota = this.dataset.idkota;
            const judulkota = this.textContent;
            window.localStorage.setItem('idkota', idkota);
            window.localStorage.setItem('judulkota', judulkota);
            namaKota.classList.add('hidden-list');
            inputSearch.value = '';
            location.reload();
          })
        });
        // console.log(kota)
      });
  } else {
    cardList.classList.add('hidden-list');
  }
});

getJadwalSholat() ;

