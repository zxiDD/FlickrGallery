import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const cachedPhotos = await AsyncStorage.getItem("cachedPhotos");
      if (cachedPhotos) {
        setPhotos(JSON.parse(cachedPhotos));
      }
      const res = await fetch(
        "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s"
      );
      const data = await res.json();
      const photos = data.photos.photo.reverse();
      const jsonValue = JSON.stringify(photos);
      await AsyncStorage.setItem("cachedPhotos", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPhotos();
  }, [photos]);

  const renderItem = (item) => {
    <Image
      source={{ uri: item.url_s }}
      style={{
        width: item.width_s,
        height: item.height_s,
        borderWidth: 2,
        borderColor: "black",
      }}
    />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url_s }}
            style={{
              width: item.width_s,
              height: item.height_s,
              borderWidth: 2,
              borderColor: "black",
            }}
          />
        )}
        ItemSeparatorComponent={<View style={{ height: 2 }}></View>}
        contentContainerStyle={{ alignItems: "center" }}
        initialNumToRender={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
});
