// SEBA Yapı Malzemeleri - Anasayfa Slider JavaScript Dosyası (script.js)
// Hata ayıklama (debugging) için console.log satırları eklenmiştir.

// Bu kod, Anasayfa slider'ının etkileşimini (kaydırma) yönetir.

// **1. HTML Elementlerini Seçme:**
// JavaScript'in etkileşim kuracağı HTML elementlerini (DOM - Document Object Model) üzerinden seçiyoruz.
const slidesWrapper = document.querySelector('.slides-wrapper'); // Slaytları içeren kaydırılabilir div
const slides = document.querySelectorAll('.slide'); // Tüm tekil slayt divleri (bir NodeList olarak döner)
const prevButton = document.querySelector('.slider-nav.prev'); // "Önceki" butonu
const nextButton = document.querySelector('.slider-nav.next'); // "Sonraki" butonu

// **2. Slider Durumu İçin Değişkenler:**
// Elementler seçildikten sonra değişkenler tanımlanır
let currentSlideIndex = 0; // Şu an gösterilen slaytın indeksi (0'dan başlar)
const totalSlides = slides.length; // <<< totalSlides BURADA TANIMLANIYOR (Element seçimi yapıldıktan hemen sonra)

// **3. Console log'ları (Hata ayıklama için):**
// Değişkenler tanımlandıktan sonra console logları kullanılabilir
console.log('Script yüklendi!');
console.log('slidesWrapper elementi:', slidesWrapper);
console.log('slides elementleri (NodeList):', slides);
console.log('Toplam slayt sayısı (totalSlides):', totalSlides); // <<< Şimdi bu log tanımlamadan sonra geldiği için hata vermeyecek

// **4. Belirtilen İndeksteki Slaytı Gösteren Ana Fonksiyon:**
// Bu fonksiyon, kendisine verilen indeksteki slaytı ekranda görünecek şekilde ayarlar.
// script.js - showSlide fonksiyonu

// Belirtilen indeksteki slaytı gösteren ana fonksiyon
function showSlide(index) {
    console.log('showSlide fonksiyonu çağrıldı, istenen index:', index);

    // İndeks Kontrolü ve Döngü Mantığı:
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }
    console.log('Güncel slayt indeksi (currentSlideIndex):', currentSlideIndex);

    // Slayt Kaydırma İşlemi (CSS Transform ile):
    // KAYDIRMA HESAPLAMASI DÜZELTİLDİ:
    // Her adımda, toplam genişliğin yüzde kaçı kadar kayacağımızı hesaplıyoruz.
    // Bir slayt, toplam genişliğin (slidesWrapper) 1 / totalSlides katıdır.
    const offsetPercentage = -currentSlideIndex * (100 / totalSlides);
    console.log('Hesaplanan kaydırma miktarı (% cinsinden):', offsetPercentage); // Örneğin ilk tıklamada -33.333... göreceksiniz

    slidesWrapper.style.transform = `translateX(${offsetPercentage}%)`; // CSS transform özelliğini güncelle
    console.log('Uygulanan transform stili:', `translateX(${offsetPercentage}%)`);
}

// showSlide fonksiyonunun geri kalanı (olay dinleyicileri, başlangıç çağrısı) aynı kalacak.

// **5. Olay Dinleyicileri (Event Listeners):**
// Kullanıcı butonlara tıkladığında çalışacak fonksiyonları tanımlıyoruz.

// "Sonraki" butonuna tıklama olayı:
nextButton.addEventListener('click', () => {
    console.log('Sağ ok (next) butonuna tıklandı.');
    showSlide(currentSlideIndex + 1); // Bir sonraki slaytı göster
});

// "Önceki" butonuna tıklama olayı:
prevButton.addEventListener('click', () => {
    console.log('Sol ok (prev) butonuna tıklandı.');
    showSlide(currentSlideIndex - 1); // Bir önceki slaytı göster
});

// Opsiyonel: Belirli aralıklarla otomatik kaydırma (şu an kapalı)
/*
let slideInterval;
function startAutoSlide() { setInterval(() => { showSlide(currentSlideIndex + 1); }, 5000); }
function stopAutoSlide() { clearInterval(slideInterval); }
slidesWrapper.addEventListener('mouseenter', stopAutoSlide);
slidesWrapper.addEventListener('mouseleave', startAutoSlide);
// startAutoSlide();
*/

// **6. Başlangıç Durumu:**
// Sayfa ilk yüklendiğinde ilk slaytı göster
console.log('Sayfa yüklendi, ilk slayt gösteriliyor...');
showSlide(currentSlideIndex); // showSlide fonksiyonu burada çağrılıyor