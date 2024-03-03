import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useScanForNFC } from "../hooks/useNFCScanner"
import { Formik } from "formik";
import { storage } from "../App";
import { Badge } from "../models/Badge";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const colorOptions = [
    '#B5EF8A',
    '#817E9F',
    '#99D17B',
    '#F08A4B',
    '#F95738',
    '#0D3B66',
    '#28666E',
    '#04724D',
    '#FE5F55',
    '#E2E4F6',
    '#08BDBD',
    '#A69658',
    '#502F4C'
]

export const SaveBadgeModal = (props: { badgeDetected?: boolean, navigation: any }) => {
    const {id, data} = useScanForNFC();

    const saveBadge = (value: { name: string }) => {
        if (!id) return;
        const badge: Badge = {
            id,
            name: value.name,
            data,
            dateCreated: new Date(),
            color: colorOptions[Math.floor(Math.random() * colorOptions.length + 1)]
        };
        storage.set(`badge.${id}`, JSON.stringify(badge));
        console.log(`Set id: ${id} as `, JSON.stringify(badge));
        props.navigation.navigate('Home');
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Save a Badge</Text>
            </View>

            {/* Badge Detection */}
            <View>

                {!id && <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                    <ActivityIndicator size={25}></ActivityIndicator>
                    <Text style={{ fontSize: 16, marginLeft: 15 }}>Go ahead and scan your badge now, we're looking for it...</Text>
                </View>}

                {id && <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                    <FontAwesomeIcon size={25} icon={faCheckCircle} color="green"></FontAwesomeIcon>
                    <Text style={{ fontSize: 16, marginLeft: 15 }}>Found your badge! You can add details below</Text>
                </View>}
            </View>

            {/* Form values */}
            <Formik
                initialValues={{ name: '', tags: [] }}
                onSubmit={saveBadge}
            >
                {((formikProps) => (
                    <View>
                        {/* Badge Name */}
                        <View style={{ marginBottom: 20 }}>
                            <Label text="Badge Name"></Label>
                            <TextInput
                                onChangeText={formikProps.handleChange('name')}
                                placeholder="Enter a name here"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 8,
                                    marginTop: 10
                                }}></TextInput>
                        </View>

                        {/* Todo: Tag add/select */}
                        {/* <View style={{ marginBottom: 20 }}>
                            <Label text="Tags"></Label>
                            <TextInput
                                placeholder="Add a tag here"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 8,
                                    marginTop: 10
                                }}></TextInput>
                        </View> */}

                        {/* Save */}
                        <TouchableOpacity
                            onPress={() => formikProps.handleSubmit()}
                            style={{
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'lightblue',
                                borderRadius: 8
                            }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'darkblue' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Formik>
        </View>
    )
}

const Label = (props: { text: string }) => {
    return (
        <Text style={{
            fontSize: 16,
            fontWeight: '500'
        }}>{props.text}</Text>
    )
}