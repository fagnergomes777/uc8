import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#e94560" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "#888",
        tabBarActiveBackgroundColor:"#DBF2DC",
        tabBarStyle:{
          backgroundColor: "#c3c3c3",
        }
    
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon:({color}) => (<AntDesign name="home" size={24} color="black" />),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon:({color}) => (<AntDesign name="setting" size={24} color="#fff" />) 
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon:({color}) => (<Feather name="search" size={24} color="#fff" />)
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon:({color}) => (<Feather name="user" size={24} color="#fff" />)
        }}
      />

       <Tabs.Screen
        name="products/index"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
