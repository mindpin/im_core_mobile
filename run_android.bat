cd android
gradlew assembleDebug && adb install -r app\build\outputs\apk\app-debug.apk && cd .. && adb reverse tcp:8081 tcp:8081 && adb reverse tcp:8097 tcp:8097 && start react-native start
