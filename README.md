# AR Oyun Projesi

Bu repository, React Native ve Expo kullanılarak geliştirilmiş iki farklı Artırılmış Gerçeklik (AR) oyun projesini içermektedir.

## Projeler

### 1. Oyun-1 (3D AR Oyunu)

#### Three.js 3D Render Sistemi
Three.js, web tabanlı 3D grafikleri render etmek için kullanılan güçlü bir JavaScript kütüphanesidir. Projemizde aşağıdaki özellikleri kullanılmaktadır:

- **Scene Management (Sahne Yönetimi)**
  * Scene Graph Yapısı
    - Hiyerarşik nesne organizasyonu
    - Parent-child ilişkileri
    - Transform inheritance
    - Dynamic object grouping
    - Scene traversal optimizasyonu

  * Camera Sistemi
    - Perspective camera setup
    - Field of view (FOV) ayarları
    - Near/far plane configurasyonu
    - Camera controls (orbit, fly, first person)
    - Dynamic camera transitions

  * Lighting System
    - Ambient lighting
    - Directional lights
    - Point lights
    - Spot lights
    - Shadow mapping

- **3D Model İşlemleri**
  * Model Loading
    - GLTF/GLB format desteği
    - FBX format dönüşümü
    - OBJ/MTL import
    - Custom model optimization
    - Progressive loading

  * Texture Management
    - Texture mapping
    - Normal mapping
    - Specular mapping
    - Environment mapping
    - Texture compression

  * Animation System
    - Skeletal animations
    - Morph targets
    - Keyframe animations
    - Animation mixing
    - Custom animation controls

- **Render Pipeline**
  * WebGL Renderer
    - WebGL 2.0 desteği
    - Custom shader materials
    - Post-processing effects
    - Render targets
    - Multiple viewport support

  * Performance Optimization
    - Frustum culling
    - Level of Detail (LOD)
    - Occlusion culling
    - Instanced rendering
    - Memory management

  * Material System
    - PBR materials
    - Custom shaders
    - Material instances
    - Dynamic material updates
    - Shader preprocessing

- **Interaction System**
  * Raycasting
    - Object picking
    - Collision detection
    - Interactive objects
    - Mouse/touch events
    - Custom interaction handlers

  * Physics Integration
    - Basic collision detection
    - Rigid body physics
    - Constraint systems
    - Particle systems
    - Physics-based animations

- **AR Integration**
  * AR Foundation Bridge
    - Camera feed integration
    - Plane detection
    - Image tracking
    - Light estimation
    - Environment probes

  * Reality Compositor
    - Real-world alignment
    - Occlusion handling
    - Environmental reflections
    - Reality blending
    - AR anchors

- Three.js tabanlı 3D grafik render
- Artırılmış Gerçeklik özellikleri
- React Three Fiber entegrasyonu
- [Detaylı bilgi için tıklayın](./oyun-1/README.md)

### 2. Oyun-2 (2D AR Oyunu)
- 2D grafik render sistemi
- React Native Canvas ile çizim işlemleri
- SVG ve vektör tabanlı grafikler
- [Detaylı bilgi için tıklayın](./oyun-2/README.md)

## Genel Gereksinimler

- Node.js
- Expo CLI
- React Native geliştirme ortamı
- Android Studio (Android geliştirme için)
- Xcode (iOS geliştirme için)

## Hızlı Başlangıç

1. Repository'yi klonlayın:
```bash
git clone [proje-url]
```

2. İstediğiniz projenin dizinine gidin:
```bash
cd oyun-1
# veya
cd oyun-2
```

3. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

4. Projeyi başlatın:
```bash
npm start
# veya
yarn start
```

## Proje Yönetimi

Projenin detaylı görev takibi ve zaman planlaması için Trello board'umuzu ziyaret edebilirsiniz:
[Trello Board](https://trello.com/invite/b/675420b2875912d0b398738b/ATTI5f77c03599dae9242dcad8bb8d0d6b43B33E9B11/guncelkonular)

### 7. Lisans ve Katkıda Bulunma

Bu proje MIT lisansı altında lisanslanmıştır. Katkıda bulunmak için lütfen:
1. Fork yapın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Branch'inizi push edin
5. Pull Request açın

## Lisans

Bu projeler 0BSD lisansı altında lisanslanmıştır.
