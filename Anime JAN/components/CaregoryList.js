import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://kitsu.io/api/edge/categories?page[limit]=500');
        const sortedCategories = response.data.data.sort((a, b) =>
          a.attributes.title.localeCompare(b.attributes.title)
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleNextPage = () => {
    if (offset + 20 < categories.length) {
      setOffset(offset + 20);
    }
  };

  const handlePrevPage = () => {
    if (offset >= 20) {
      setOffset(offset - 20);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    navigation.navigate('CategoriasScreen', { categoryTitle: category.attributes.title });
  };

  const renderCategory = ({ item }) => {
    const imageUrl = item.attributes.image
      ? item.attributes.image.original
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1yA3DZarTQ-9auSVInfeQw2KvNObFdrLzxw&usqp=CAU';

    return (
      <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress(item)}>
        <Image source={{ uri: imageUrl }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.attributes.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories.slice(offset, offset + 20)}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity style={styles.paginationButton} onPress={handlePrevPage}>
          <Text style={styles.paginationButtonText}>{'< Anterior'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handleNextPage}
          disabled={offset + 20 >= categories.length}
        >
          <Text style={styles.paginationButtonText}>{'Siguiente >'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
  },
  categoryName: {
    fontSize: 20,
    textAlign: 'center',
    left: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: { width: 0.5, height: 0.9 },
    textShadowRadius: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  paginationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CategoryList;