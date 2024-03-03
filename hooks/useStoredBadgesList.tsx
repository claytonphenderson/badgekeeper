import { useEffect, useState } from "react"
import { Badge } from "../models/Badge"
import { useMMKVListener } from "react-native-mmkv";
import { storage } from "../App";

export const useStoredBadgesList = () => {
    const [badgeList, setBadgeList] = useState<Set<string>>(new Set(storage.getAllKeys().filter(x => x.startsWith('badge'))));

    useMMKVListener(key => {
        if (key.startsWith('badge') && !badgeList.has(key)) {
            setBadgeList(new Set([...badgeList, key]));
        }
    });

    return badgeList;
}