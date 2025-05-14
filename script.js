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
// script.js - showSlide fonksiyonu (Sayfa Numarası Debugging Eklenmiş Hali)

// Belirtilen indeksteki slaytı gösteren ana fonksiyon
function showSlide(index) {
    // ... (mevcut console.log satırları - hata ayıklama için varsa) ...
    // console.log('showSlide fonksiyonu çağrıldı, istenen index:', index);

    // İndeks Kontrolü ve Döngü Mantığı:
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }
    // console.log('Güncel slayt indeksi (currentSlideIndex):', currentSlideIndex);

    // Sayfa Numarası Göstergesini Güncelle (HATA AYIKLAMA LOGLARI EKLENDİ)
    const paginationElement = document.querySelector('.slider-pagination'); // Pagination elementini seçme satırı

    console.log('Pagination elementi seçildi mi?', paginationElement); // <-- LOG 1: Element bulunduysa burada HTML elementi görürsünüz, bulunamadıysa 'null' yazar.

    if (paginationElement) { // Eğer element bulunduysa devam et
         // currentSlideIndex 0 tabanlı olduğu için 1 ekliyoruz (1/3 gibi görünmesi için)
         const pageText = `${currentSlideIndex + 1} / ${totalSlides}`; // Sayfa metnini hazırla
         paginationElement.textContent = pageText; // Metni elementin içine yaz

         console.log('Pagination metni hazırlandı:', pageText); // <-- LOG 2: Hazırlanan metin ne?
         console.log('Elementin textContent\'i güncellendi:', paginationElement.textContent); // <-- LOG 3: Elementin içeriği JS tarafından değiştirildi mi?

    } else {
         console.error('HATA: ".slider-pagination" elementi bulunamadı!'); // <-- LOG 4: Element bulunamazsa bu hata konsola yazılır.
    }


    // Slayt Kaydırma İşlemi (CSS Transform ile):
    const offsetPercentage = -currentSlideIndex * (100 / totalSlides);
    // console.log('Hesaplanan kaydırma miktarı (% cinsinden):', offsetPercentage);

    slidesWrapper.style.transform = `translateX(${offsetPercentage}%)`;
    // console.log('Uygulanan transform stili:', `translateX(${offsetPercentage}%)`);
}
// ... fonksiyonun geri kalanı (olay dinleyicileri, otomatik kaydırma, başlangıç çağrısı) ...

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

// Opsiyonel: Belirli aralıklarla otomatik kaydırma

// script.js - Otomatik Kaydırma Fonksiyonları (Düzeltildi)

let slideInterval; // Interval ID'sini tutacak değişken

// Otomatik kaydırmayı başlatan fonksiyon (Önceki timer'ı temizler)
function startAutoSlide() {
    // Önceki interval'ı (varsa) temizle ki birden fazla timer çalışmasın
    stopAutoSlide(); // <-- Önceki zamanlayıcıyı durdur (bu stopAutoSlide fonksiyonunu çağırır)

    // Yeni interval'ı başlat
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1); // Her intervalde bir sonraki slaytı göster
    }, 6000); // Otomatik geçiş süresi milisaniye cinsinden (bu sayıyı daha önce ayarladınız)
}

// Otomatik kaydırmayı durduran fonksiyon
function stopAutoSlide() {
    clearInterval(slideInterval); // <-- Zamanlayıcıyı durdur
    // İsteğe bağlı: timer temizlendikten sonra değişkeni null yapabiliriz (zorunlu değil)
    // slideInterval = null;
}

// Mouse olay dinleyicileri (bu kısım aynı kalacak)
// Fare slider alanına girince stopAutoSlide çalışır
//slidesWrapper.addEventListener('mouseenter', stopAutoSlide);
// Fare slider alanından çıkınca startAutoSlide çalışır
// slidesWrapper.addEventListener('mouseleave', startAutoSlide);

// Sayfa yüklendiğinde otomatik kaydırmayı başlat (bu çağrı da aynı kalacak)
startAutoSlide();

// **6. Başlangıç Durumu:**
// Sayfa ilk yüklendiğinde ilk slaytı göster
console.log('Sayfa yüklendi, ilk slayt gösteriliyor...');
showSlide(currentSlideIndex); // showSlide fonksiyonu burada çağrılıyor