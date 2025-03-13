You can upgrade this app indeed to any app

## BUILDING

app.json && android/app/build.gradle
&& in xcode Version field

## Change Package NAME for Boilerolates

Rename the project' subfolder from: "android/app/src/main/java/MY/APP/OLD_ID/" to: "android/app/src/main/java/MY/APP/NEW_ID/"

### Step1:

There are a file name with android/app/BUCK open the file and
find these lines then change it with your desired name.

android_build_config(
name = "build_config",
package = "com.connect.bonfires”,//change this name
)

Android_resource(
name = "res",
package = "com.connect.bonfires",//change this name
res = "src/main/res",
)

### Step2:

Open 4nother file name/location is android/app/build.gradle
and find the

defaultConfig {
applicationId "com.connect.bonfires" //change this name
minSdkVersion rootProject.ext.minSdkVersion
targetSdkVersion rootProject.ext.targetSdkVersion
versionCode 1
versionName "1.0"
missingDimensionStrategy 'react-native-camera', 'general'
}

### Step3:

Open another file

android/app/src/main/manifest.xml
and find
this line above of the project change the package name.

### Step4:

Open another file

android/app/src/main/java/com/appname/MainActivity.java
and Find this line above of the project change the

package name : package com.connect.test.

### Step5:

Open another file

android/app/src/main/java/com/appname/MainApplication.java
and Find this line above of the project change

## iOS Specific Settings

Open project with xcode
Build Setting
Search Enable Bitcode option in Build Options category.
Select no.

## Over The Air Updated

Remember to search for SDK version in the Android folder and update all instances
Remember to update the app.json

javascript is updated on repository with sdkVersion, wokflow, channel

## installing packages

expo install react-native-gesture-handler react-native-reanimated @react-native-community/blur @react-native-community/datetimepicker @react-native-community/netinfo @react-native-picker/picker

cd ios && pod install or npx pod-install

## Update cocoapods

sudo gem install cocoapods -n /usr/local/bin

If you have errors like
ERROR: Error installing cocoapods:
ERROR: Failed to build gem native extension.

First do
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer/
sudo xcode-select --switch /Library/Developer/CommandLineTools

then try again

then switch back before doing pod install

sudo xcode-select --switch /Applications/Xcode.app

otherwise you may encounter an error like
xcrun: error: SDK "iphoneos" cannot be located

## pod install

    if npx pod-install refuses with compatibility errors
    try
    npx pod install --repo-update
