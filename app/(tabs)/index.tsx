import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Button } from 'react-native-paper';

export default function ContactsScreen() {
	const [contacts, setContacts] = useState<Contacts.Contact[] | null>([]);
	const [status, setStatus] = useState<Contacts.PermissionStatus | null>(null);

	const requestPermission = async () => {
		const { status } = await Contacts.requestPermissionsAsync();
		console.log("status", status);
		setStatus(status);

		if (status === 'granted') {
			const { data } = await Contacts.getContactsAsync({
				fields: [Contacts.Fields.Emails],
			});
			if (data.length > 0) {
				setContacts(data);
			}
		}
	};

	return (
		<View style={styles.container}>
			<Text>User Contacts:</Text>
			{status !== 'granted'
				&& <Button
					mode="contained"
					onPress={requestPermission}
				>
					Request Permission
				</Button>
			}

			{contacts?.map((contact) => (
				<Text key={contact.id}>{contact.name}</Text>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
