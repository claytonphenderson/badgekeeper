import { NativeModules, Text, Touchable, TouchableOpacity, View } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Badge } from "../models/Badge"
import moment from "moment";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { useState } from "react";

let currentNdef = '';
export const BadgeListItem = (props: { badgeKey: string }) => {
    const [badge, _] = useMMKVObject<Badge>(props.badgeKey);
    const [writing, setWriting] = useState<boolean>(false);

    const write = async () => {
        let result = false;
        setWriting(true);

        try {
            console.log('initiating write...')
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const bytes = Ndef.encodeMessage([Ndef.uriRecord(badge!.data)]);
            if (bytes) {
                await NfcManager.ndefHandler.writeNdefMessage(bytes);
                result = true;
                console.log('wrote NFC data...');
            }
        } catch (ex) {
            console.warn(ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
            setWriting(false);
        }
    }

    const cancelWrite = async () => {
        if (writing) await NfcManager.cancelTechnologyRequest();
    }
    const setTag = () => {
        currentNdef = badge!.data;
        NativeModules.HostCard.setTag(badge!.data);
    }
    if (!currentNdef) {
        setTag();
    }
    const isCurrent = currentNdef === badge!.data;

    return (
        <TouchableOpacity
            onPress={setTag}
            onLongPress={write}
            onPressOut={cancelWrite}
            style={writing ? { backgroundColor: 'red' } : isCurrent ? { backgroundColor: 'green' } : null}
        >
            <View style={{ height: 90, justifyContent: 'center', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        backgroundColor: badge?.color ?? 'blue',
                        marginRight: 10
                    }}></View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>{badge?.name ?? 'Unnamed Badge'}</Text>
                        <Text style={{ fontSize: 12 }}>Saved {badge?.dateCreated ? moment(badge.dateCreated).format('MMMM D, YYYY h:mm a') : 'Sometime ago...'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
