import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SearchHistory = ({ searchHistory, onSearch }) => {
  const handleHistoryPress = (query) => {
    onSearch(query);
  };

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Search History</Text>
      {searchHistory.map((query, index) => (
        <TouchableOpacity key={index} style={styles.historyItem} onPress={() => handleHistoryPress(query)}>
          <Text style={styles.historyText}>{query}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
  },
});

export default SearchHistory;
