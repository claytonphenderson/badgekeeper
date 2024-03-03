import { useEffect, useState } from "react"
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { sha256 } from "react-native-sha256";
import { storage } from "../App";
import { Badge } from "../models/Badge";

export const useScanForNFC = () => {
    const [badge, setBadge] = useState<Badge>();

    useEffect(() => {
        const scanForBadge = async () => {
            try {
                await NfcManager.requestTechnology(NfcTech.Ndef);
                const tag = await NfcManager.getTag();
                console.log('found a badge!', tag?.id);

                const resultString = Ndef.uri.decodePayload((tag?.ndefMessage[0] as any).payload);
                const hash = await sha256(resultString);

                const existingJson = storage.getString(`badge.${hash}`);
                if (existingJson) {
                    console.log(existingJson)
                    setBadge(JSON.parse(existingJson));
                }

            } catch (ex) {
                console.error(ex);
            } finally {
                NfcManager.cancelTechnologyRequest();
            }
        }

        scanForBadge();

        return () => {
            NfcManager.cancelTechnologyRequest();
        }
    }, []);

    return badge;
}