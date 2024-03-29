# Badge Keeper

This is a toy app that can store a collection of NFC badge data and write saved badges to physical NFC devices. 
![image](https://github.com/claytonphenderson/badgekeeper/assets/7455765/94bb40c8-a901-467b-9173-9a8819e7a5a7)


## Limitations
- Emulation of NFC Forum 2 badges seems to not be supported by Android at this time as far as I can tell.  Will have to settle for reading and writing.
- only Android is supported at this time
- currently only supports URI content types

## Current Functionality
- Read and save NFC badges to on-device memory.  Add a name to the saved badge.
- Write saved badge data to physical NFC badges.   

## To do
- delete entry
- indicate if a badge is already assigned to saved entry
- add unit tests
- clean up the UI to make it clearer what is happening and when
- add tags to the badge entries to make it easier to organize/sort/filter them

## APK Download
If you're cool with downloading a file from a stranger, go nuts.
https://claytonpersonal.blob.core.windows.net/public/badgekeeper.apk
