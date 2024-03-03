# Badge Keeper

This is a toy app that can store a collection of NFC badge data and write saved badges to physical NFC devices. 

## Limitations
- only Android is supported at this time
- currently only supports URI content types

## Current Functionality
- Read and save NFC badges to on-device memory.  Add a name to the saved badge.
- Write saved badge data to physical NFC badges.  Emulation of NFC Forum 2 badges seems to not be supported by Android at this time as far as I can tell.  

## To do
- clean up the UI to make it clearer what is happening and when
- add tags to the badge entries to make it easier to organize/sort/filter them
- add unit tests