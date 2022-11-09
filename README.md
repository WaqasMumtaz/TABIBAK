# TABIBAK
# New Version of React Native for APK && Release build changes
1 android -> build.gradle -> allprojects -> repositories "add this" >>> exclusiveContent {
           filter {
               includeGroup "com.facebook.react"
           }
           forRepository {
               maven {
                   url "$rootDir/../node_modules/react-native/android"
               }
           }
      }
