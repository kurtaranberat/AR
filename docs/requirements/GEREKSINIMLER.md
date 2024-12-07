# AR Oyun Projesi - Gereksinim Dokümanı

## 1. Fonksiyonel Gereksinimler

### 1.1. AR Özellikleri
- [ ] Kamera erişimi ve AR tracking
- [ ] Marker tanıma sistemi
- [ ] 3D/2D obje yerleştirme
- [ ] Gerçek zamanlı render

### 1.2. Oyun Mekanikleri
- [ ] Oyun-1: 3D obje manipülasyonu
- [ ] Oyun-2: 2D sprite etkileşimleri
- [ ] Puan sistemi
- [ ] İlerleme kaydetme

### 1.3. Kullanıcı Arayüzü
- [ ] Ana menü
- [ ] Oyun içi UI
- [ ] Ayarlar menüsü
- [ ] Skor tablosu

## 2. Teknik Gereksinimler

### 2.1. Performans
- Minimum 30 FPS
- Maksimum 100MB RAM kullanımı
- 5 saniyeden az yükleme süresi

### 2.2. Platform Uyumluluğu
- iOS 13+
- Android 8+
- ARKit/ARCore desteği

### 2.3. Ağ Gereksinimleri
- Offline çalışabilme
- Düşük bant genişliği kullanımı
- Skor senkronizasyonu

## 3. Güvenlik Gereksinimleri
- Kamera izinleri yönetimi
- Veri şifreleme
- Güvenli API haberleşmesi

## 4. Kullanıcı Hikayeleri

### 4.1. Oyun-1 (3D)
1. Kullanıcı olarak, AR kamerayı açabilmeliyim
2. Kullanıcı olarak, 3D objeleri yerleştirebilmeliyim
3. Kullanıcı olarak, objelerle etkileşime girebilmeliyim

### 4.2. Oyun-2 (2D)
1. Kullanıcı olarak, 2D elementleri görebilmeliyim
2. Kullanıcı olarak, sprite'larla etkileşime girebilmeliyim
3. Kullanıcı olarak, puan kazanabilmeliyim

## 5. Kabul Kriterleri

### 5.1. AR Fonksiyonları
- AR tracking %95 doğrulukla çalışmalı
- Obje yerleştirme 1 saniyeden az sürmeli
- Kamera gecikmesi 100ms'den az olmalı

### 5.2. Oyun Mekanikleri
- Oyun kontrolleri responsive olmalı
- Puan sistemi hatasız çalışmalı
- İlerleme kaydı güvenilir olmalı

### 5.3. Kullanıcı Deneyimi
- UI elementleri responsive olmalı
- Menüler akıcı çalışmalı
- Hata mesajları anlaşılır olmalı
