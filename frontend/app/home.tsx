import PasswordEntry from '@/components/PasswordEntry';
import { Stack } from '@react-native-material/core';


type PasswordData = {
    application: string,
    password: string,
}

export default function HomeScreen() {

    let data: PasswordData[] = [
        {
            application: "Google",
            password: "pasGoogle",
        },
        {
            application: "Facebook",
            password: "pasFacebook",
        },
        {
            application: "Twitter",
            password: "pasTwitter",
        },
    ]


    return (
        <Stack  direction="column" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {data.map((item, index) =>
                <PasswordEntry key={index} application={item.application} password={item.password} />
            )
            }
        </Stack>
    )
}
