package com.badgekeeper

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class HostCardModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "HostCard";
    }

    @ReactMethod
    fun setTag(tag: String) {
        HostCardEmulatorService.setTag(tag)
    }
}