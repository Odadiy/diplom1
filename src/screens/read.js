import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const NewsRead = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const newsSnapshot = await firestore().collection('news').get();
      const newsData = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const renderNewsItem = ({ item }) => {
    return (
      <View style={styles.newsItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.cont}>{item.cont}</Text>
        <Text style={styles.image}>{item.image}</Text>
        <Text style={styles.comment}>Сэтгэгдэл:</Text>
        {item.comments && item.comments.map((comment, index) => (
          <Text key={index} style={styles.comment}>
            {comment}
          </Text>
        ))}
        <TextInput
          style={styles.commentInput}
          placeholder="Сэтгэгдэл бичих"
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Сэтгэгдэл нийтлэх" onPress={() => addComment(item.id)} />
      </View>
    );
  };

  const addComment = async (newsId) => {
    if (newComment.trim() === '') return;

    try {
      await firestore().collection('comments').add({
        news_id: newsId,
        comment: newComment,
      });
      fetchNews();
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Хайлт хийх"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  newsItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  cont: {
    fontSize: 16,
  },
  image: {
    fontSize: 16,
  },
  comment: {
    fontSize: 16,
    color: 'gray',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default NewsRead;
