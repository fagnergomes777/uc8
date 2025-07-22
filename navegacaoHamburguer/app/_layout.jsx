import {Drawer} from 'expo-router/drawer'
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer"
import {useRouter} from 'expo-router'
import { StatusBar } from 'react-native'

const CustomDrawerContent = () => {
    const router = useRouter()
    return(
        <DrawerContentScrollView>
            <DrawerItem label="Perfil" onPress={()=> router.push("/perfil")}/>
        </DrawerContentScrollView>
    )
}

export default function RootLayout(){
    return(
        <>
            <StatusBar backgroundColor='#e94560'/>
            <Drawer 
                drawerContent={() => <CustomDrawerContent/>}
            >

            </Drawer>
        
        </>
    )
}


