import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const SubCategoryScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const subCategoryRef = collection(db, `categories/${categoryId}/subCategories`);
      const querySnapshot = await getDocs(subCategoryRef);
      const subCategoryList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubCategories(subCategoryList);
    };

    fetchSubCategories();
  }, [categoryId]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF3E3", paddingTop: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>{categoryId}</Text>
      <FlatList
        data={subCategories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PetDetail', { petId: item.id })}
            style={{
              flex: 1,
              margin: 10,
              backgroundColor: "#FFF",
              padding: 12,
              borderRadius: 15,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            <Text style={{ fontWeight: "bold", marginTop: 5 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SubCategoryScreen;
