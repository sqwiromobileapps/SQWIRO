// For react-native pdf
If you use RN 0.59.0 and above, please add following to your android/app/build.gradle\*\*

android {

    packagingOptions {
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libjsc.so'
        pickFirst 'lib/arm64-v8a/libjsc.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    }

}

add jcenter()

allprojects {
repositories {
mavenCentral()
mavenLocal()
maven {
// All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../node_modules/jsc-android/dist")
}

        google()

-       jcenter()
          maven { url 'https://www.jitpack.io' }
      }
  }
