import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { BadgeListItem } from "../components/BadgeListItem"
import { useStoredBadgesList } from "../hooks/useStoredBadgesList"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";


export const HomeScreen = (props: any) => {
    const badgeKeys = useStoredBadgesList();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ListHeaderComponent={() => <Header {...props}></Header>}
                data={Array.from(badgeKeys)}
                renderItem={({ item }) => <BadgeListItem badgeKey={item}></BadgeListItem>}
            ></FlatList>
        </View>
    )
}

export const Header = (props: { writingBadgeId?: string }) => {
    return (
        <View>
            <NewBadgeListItem {...props}></NewBadgeListItem>
            <View style={{alignItems:'center', paddingHorizontal: 40, marginTop: 10}}>
                <Text style={{textAlign:'center', fontSize: 16}}>Press and hold a saved item to write to a physical badge</Text>
            </View>
        </View>
    )
}

export const NewBadgeListItem = (props: any) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate('SaveBadge')}
            style={{
                marginTop: 20,
                marginHorizontal: 20,
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'lightblue',
                borderRadius: 8
            }}>
            <FontAwesomeIcon icon={faPlusCircle} size={25} color='darkblue'></FontAwesomeIcon>
            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 10, color: 'darkblue' }}>Add a new badge</Text>
        </TouchableOpacity>
    )
}