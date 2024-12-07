# AR Sistemi Teknik Tasarım Dokümantasyonu

## 1. Render Sistemleri

### 1.1 Three.js Render Sistemi
**Tanım:** Web tabanlı 3D grafikleri render etmek için kullanılan JavaScript kütüphanesidir.

#### 1.1.1 Scene Graph (Sahne Grafiği)
**Tanım:** 3D sahnenin hiyerarşik yapısını ve nesneler arası ilişkileri yöneten sistemdir.

**Özellikler:**
- Hiyerarşik Nesne Yönetimi: Nesnelerin parent-child ilişkilerini ve transformasyonlarını yönetir
- Dinamik Gruplandırma: Benzer nesneleri performans için gruplar
- Otomatik Optimizasyon: Scene traversal ve spatial partitioning ile performans iyileştirmesi sağlar

#### 1.1.2 Camera Sistemi
**Tanım:** 3D sahnenin görüntülenmesini ve perspektifini kontrol eden sistemdir.

**Bileşenler:**
1. Perspective Camera
   - Kullanım: Gerçekçi 3D görüntüleme için
   - Özellikler: FOV ayarları, near/far plane kontrolü
   - Avantaj: Derinlik algısı gereken sahneler için ideal

2. Orthographic Camera
   - Kullanım: 2D UI ve teknik görüntüleme için
   - Özellikler: Sabit ölçek, paralel projeksiyon
   - Avantaj: Ölçü ve plan görüntülemede hassas sonuç

#### 1.1.3 Işıklandırma Sistemi
**Tanım:** Sahnenin aydınlatmasını ve gölgelendirmesini yöneten sistemdir.

**Işık Türleri:**
1. Ambient Light
   - Tanım: Genel ortam ışığı
   - Kullanım: Temel aydınlatma için
   - Özellik: Gölge oluşturmaz

2. Directional Light
   - Tanım: Yönlü ışık kaynağı
   - Kullanım: Güneş ışığı simülasyonu
   - Özellik: Paralel ışık ışınları

3. Point Light
   - Tanım: Noktasal ışık kaynağı
   - Kullanım: Lamba, ateş efekti vb.
   - Özellik: Her yöne eşit yayılım

### 1.2 Model Sistemi

#### 1.2.1 Model Yükleme
**Tanım:** 3D modellerin yüklenmesi ve işlenmesi sürecidir.

**Desteklenen Formatlar:**
1. GLTF/GLB
   - Tanım: Standart 3D model formatı
   - Avantaj: Optimize edilmiş, hızlı yükleme
   - Kullanım: Ana model formatı olarak

2. FBX
   - Tanım: Autodesk'in 3D model formatı
   - Avantaj: Yaygın kullanım
   - Kullanım: Alternatif format olarak

#### 1.2.2 Material Sistemi
**Tanım:** 3D modellerin yüzey özelliklerini tanımlayan sistemdir.

**Material Türleri:**
1. PBR Material
   - Tanım: Fizik bazlı render materyali
   - Özellikler: Metalness, roughness, normal map
   - Kullanım: Gerçekçi yüzeyler için

2. Custom Shader
   - Tanım: Özel yazılmış shader programları
   - Özellikler: GLSL kod desteği
   - Kullanım: Özel efektler için

### 1.3 AR Sistemi

#### 1.3.1 Marker Tracking
**Tanım:** Gerçek dünyada işaretçileri algılama ve takip sistemidir.

**Özellikler:**
1. Marker Algılama
   - Tanım: İşaretçilerin kamera görüntüsünde tespiti
   - Hassasiyet: %95+ doğruluk oranı
   - Performans: 30+ FPS işleme hızı

2. Pose Estimation
   - Tanım: İşaretçinin konum ve rotasyonunu hesaplama
   - Hassasiyet: Sub-milimetre doğruluk
   - Stabilite: Jitter önleme sistemi

#### 1.3.2 Environment Understanding
**Tanım:** Gerçek dünya ortamını algılama ve analiz sistemidir.

**Bileşenler:**
1. Plane Detection
   - Tanım: Düz yüzeyleri algılama
   - Türler: Yatay ve dikey düzlemler
   - Kullanım: AR içeriği yerleştirme

2. Light Estimation
   - Tanım: Ortam ışığını analiz etme
   - Özellikler: Renk ve yoğunluk tespiti
   - Kullanım: Gerçekçi AR render için

### 1.4 Performans Optimizasyonu

#### 1.4.1 Render Optimizasyonu
**Tanım:** Render performansını iyileştiren teknikler bütünüdür.

**Teknikler:**
1. Frustum Culling
   - Tanım: Görüş alanı dışı nesneleri render etmeme
   - Kazanım: %30-50 performans artışı
   - Uygulama: Otomatik ve dinamik

2. LOD Sistemi
   - Tanım: Mesafeye göre detay seviyesi
   - Kazanım: %40-60 performans artışı
   - Uygulama: Dinamik ve kademeli

#### 1.4.2 Memory Yönetimi
**Tanım:** Bellek kullanımını optimize eden sistemdir.

**Stratejiler:**
1. Asset Streaming
   - Tanım: Dinamik içerik yükleme sistemi
   - Metod: Progressive ve on-demand loading
   - Hedef: Minimum bellek kullanımı

2. Cache Yönetimi
   - Tanım: Önbellek optimizasyon sistemi
   - Metod: LRU (Least Recently Used) algoritması
   - Hedef: Hızlı erişim ve optimum bellek kullanımı

## 2. Network Sistemi

### 2.1 Real-time Communication
- **WebSocket Implementation**
  * Connection Management
    - Connection pooling
    - Auto-reconnection
    - Heart-beat monitoring
    - Load balancing
    - Connection multiplexing
  
  * Data Synchronization
    - State synchronization
    - Delta compression
    - Bandwidth optimization
    - Latency compensation
    - Conflict resolution

### 2.2 REST API
- **Endpoint Design**
  * Resource Management
    - RESTful conventions
    - Versioning strategy
    - Rate limiting
    - Caching policy
    - Error handling
  
  * Authentication
    - JWT implementation
    - OAuth2 flow
    - Token management
    - Session handling
    - Security measures
